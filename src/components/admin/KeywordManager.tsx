import { useMemo, useRef, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  Download,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GROUPS,
  INTENTS,
  STATUSES,
  SOURCES,
  TYPES,
  ARRAY_FIELDS,
  keywordSchema,
  keywordWarnings,
  parseKeywordCsv,
  exportKeywordCsv,
  type KeywordValues,
} from "@/lib/seo-keywords";
import {
  listKeywords,
  saveKeyword,
  removeKeyword,
  importKeywords,
  listSearchSnapshots,
  type KeywordRow,
} from "@/lib/seo-keyword-db";
import { refreshSearchConsole } from "@/lib/seo-gsc.functions";
import { normalizeSearch } from "@/lib/site-search";

function Picker({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Record<string, string>;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([key, name]) => (
          <SelectItem key={key} value={key}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function download(content: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const TEXT_FIELDS = [
  ["keyword", "Từ khóa"],
  ["primary_keyword", "Từ khóa chính"],
  ["target_url", "URL đích"],
  ["search_location", "Khu vực tìm kiếm"],
  ["secondary_keywords", "Từ khóa phụ"],
  ["semantic_keywords", "Từ khóa ngữ nghĩa"],
  ["long_tail_keywords", "Từ khóa dài"],
  ["questions", "Câu hỏi liên quan"],
  ["seo_title", "SEO Title dự kiến"],
  ["meta_description", "Meta Description dự kiến"],
  ["h1", "H1 dự kiến"],
  ["related_urls", "Liên kết nội bộ liên quan"],
  ["cta", "CTA"],
  ["notes", "Ghi chú / nguồn xác minh"],
] as const;

export function KeywordManager() {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [intent, setIntent] = useState("all");
  const [status, setStatus] = useState("all");
  const [warning, setWarning] = useState("all");
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<KeywordRow | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [deleting, setDeleting] = useState<KeywordRow | null>(null);
  const [pendingImport, setPendingImport] = useState<KeywordValues[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [gscBusy, setGscBusy] = useState(false);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [gscNotice, setGscNotice] = useState("");
  const keywords = useQuery({ queryKey: ["admin", "seo-keywords"], queryFn: listKeywords });
  const snapshots = useQuery({ queryKey: ["admin", "seo-gsc"], queryFn: listSearchSnapshots });
  const data = keywords.data ?? [];
  const evidence = snapshots.data ?? [];
  const warnings = useMemo(() => keywordWarnings(data), [data]);
  const rows = useMemo(
    () =>
      data.filter((row) => {
        const flags = warnings.get(row.id);
        const needle = normalizeSearch(query);
        return (
          (!needle ||
            normalizeSearch(
              [row.keyword, row.primary_keyword, ...row.secondary_keywords, row.target_url].join(
                " ",
              ),
            ).includes(needle)) &&
          (group === "all" || row.keyword_group === group) &&
          (intent === "all" || row.search_intent === intent) &&
          (status === "all" || row.content_status === status) &&
          (warning === "all" || (warning === "duplicate" ? flags?.duplicate : flags?.multipleUrls))
        );
      }),
    [data, query, group, intent, status, warning, warnings],
  );
  const lastPage = Math.max(0, Math.ceil(rows.length / 25) - 1);
  const currentPage = Math.min(page, lastPage);
  const visible = rows.slice(currentPage * 25, currentPage * 25 + 25);
  const refreshFn = useServerFn(refreshSearchConsole);
  async function refreshGsc(siteUrl?: string) {
    setGscBusy(true);
    try {
      const result = await refreshFn({ data: siteUrl ? { siteUrl } : {} });
      if (result.status === "selection_required") {
        setCandidates(result.candidates);
        return;
      }
      if (result.status === "not_connected") {
        setGscNotice("Chưa kết nối Search Console.");
        return;
      }
      setCandidates([]);
      setGscNotice(
        `${result.count} truy vấn–trang · ${result.startDate} → ${result.endDate}${result.capped ? " · đạt giới hạn 25.000 dòng" : ""}`,
      );
      await qc.invalidateQueries({ queryKey: ["admin", "seo-gsc"] });
      toast.success("Đã cập nhật Search Console");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không cập nhật được Search Console.");
    } finally {
      setGscBusy(false);
    }
  }
  function startEdit(row?: KeywordRow) {
    setEditing(row ?? null);
    setForm(
      row
        ? { ...row }
        : {
            keyword: "",
            primary_keyword: "",
            keyword_group: "A",
            search_intent: "transactional",
            search_location: "TP.HCM",
            content_type: "service",
            content_status: "proposed",
            evidence_source: "proposed",
            priority: 2,
            cta: "Nhận báo giá",
          },
    );
    setOpen(true);
  }
  function update(key: string, value: unknown) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const clean = keywordSchema.parse(form);
      await saveKeyword(clean, editing?.id);
      await qc.invalidateQueries({ queryKey: ["admin", "seo-keywords"] });
      setOpen(false);
      toast.success("Đã lưu từ khóa");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không lưu được từ khóa.");
    } finally {
      setBusy(false);
    }
  }
  async function confirmDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      await removeKeyword(deleting.id);
      await qc.invalidateQueries({ queryKey: ["admin", "seo-keywords"] });
      setDeleting(null);
      toast.success("Đã xóa từ khóa");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không xóa được từ khóa.");
    } finally {
      setBusy(false);
    }
  }
  async function confirmImport() {
    if (!pendingImport) return;
    setBusy(true);
    try {
      const result = await importKeywords(pendingImport);
      await qc.invalidateQueries({ queryKey: ["admin", "seo-keywords"] });
      setPendingImport(null);
      toast.success(
        `Đã nhập ${result.inserted} dòng; bỏ qua ${result.skipped} dòng trùng từ khóa–URL.`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không nhập được dữ liệu.");
    } finally {
      setBusy(false);
    }
  }
  function resetPage(setter: (v: string) => void) {
    return (value: string) => {
      setter(value);
      setPage(0);
    };
  }
  const lookup = (options: Record<string, string>, value: string) => options[value] ?? value;
  const metric = (keyword: string, url: string) =>
    evidence.find(
      (row) =>
        row.query.trim().toLowerCase() === keyword.trim().toLowerCase() &&
        row.page_url.replace(/\/$/, "") === url.replace(/\/$/, ""),
    );
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Quản lý từ khóa SEO</h1>
          <p className="mt-1 text-sm text-muted-foreground">Saigon Handling · Keyword-to-URL</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            <Upload className="mr-2 size-4" />
            Nhập CSV
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              download(
                exportKeywordCsv(
                  rows.map((row) => {
                    const stats = metric(row.keyword, row.target_url);
                    return {
                      ...row,
                      gsc_clicks: stats?.clicks ?? null,
                      gsc_impressions: stats?.impressions ?? null,
                      gsc_ctr: stats?.ctr ?? null,
                      gsc_position: stats?.position ?? null,
                      gsc_start_date: stats?.start_date ?? null,
                      gsc_end_date: stats?.end_date ?? null,
                    };
                  }),
                ),
                "tu-khoa-seo.csv",
              )
            }
          >
            <Download className="mr-2 size-4" />
            Xuất CSV
          </Button>
          <Button onClick={() => startEdit()}>
            <Plus className="mr-2 size-4" />
            Thêm từ khóa
          </Button>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        aria-label="Nhập bảng từ khóa CSV"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          try {
            setPendingImport(parseKeywordCsv(await file.text()));
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "CSV không hợp lệ.");
          }
        }}
      />
      <div className="grid grid-cols-2 gap-4 border-y border-border py-4 md:grid-cols-4">
        {[
          ["Từ khóa", data.length],
          ["URL được gán", new Set(data.map((r) => r.target_url).filter(Boolean)).size],
          ["Từ khóa trùng", data.filter((r) => warnings.get(r.id)?.duplicate).length],
          ["Nhắm nhiều URL", data.filter((r) => warnings.get(r.id)?.multipleUrls).length],
        ].map(([label, count]) => (
          <div key={label}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{count}</p>
          </div>
        ))}
      </div>
      <Tabs defaultValue="keywords">
        <TabsList>
          <TabsTrigger value="keywords">Bản đồ từ khóa</TabsTrigger>
          <TabsTrigger value="gsc">Search Console</TabsTrigger>
        </TabsList>
        <TabsContent value="keywords" className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                aria-label="Tìm từ khóa hoặc URL"
                placeholder="Từ khóa hoặc URL..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                className="pl-9"
              />
            </div>
            <Picker
              label="Nhóm từ khóa"
              value={group}
              onChange={resetPage(setGroup)}
              options={{ all: "Tất cả nhóm", ...GROUPS }}
            />
            <Picker
              label="Ý định tìm kiếm"
              value={intent}
              onChange={resetPage(setIntent)}
              options={{ all: "Tất cả ý định", ...INTENTS }}
            />
            <Picker
              label="Trạng thái nội dung"
              value={status}
              onChange={resetPage(setStatus)}
              options={{ all: "Tất cả trạng thái", ...STATUSES }}
            />
            <Picker
              label="Cảnh báo trùng lặp"
              value={warning}
              onChange={resetPage(setWarning)}
              options={{
                all: "Tất cả từ khóa",
                duplicate: "Từ khóa trùng",
                multiple: "Nhắm nhiều URL",
              }}
            />
          </div>
          {keywords.isError ? (
            <p role="alert" className="text-destructive">
              Không tải được từ khóa.{" "}
              <Button variant="outline" onClick={() => keywords.refetch()}>
                Thử lại
              </Button>
            </p>
          ) : null}
          <div className="max-w-full overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Từ khóa / chủ đề chính",
                    "URL đích",
                    "Nhóm / ý định",
                    "Trạng thái",
                    "Ưu tiên",
                    "Nguồn / số liệu",
                    "Cập nhật",
                    "",
                  ].map((label) => (
                    <TableHead key={label}>{label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8}>Đang tải...</TableCell>
                  </TableRow>
                ) : visible.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>Chưa có từ khóa phù hợp.</TableCell>
                  </TableRow>
                ) : (
                  visible.map((row) => {
                    const flags = warnings.get(row.id);
                    const stats = metric(row.keyword, row.target_url);
                    return (
                      <TableRow key={row.id}>
                        <TableCell className="min-w-52 max-w-72 whitespace-normal">
                          <p className="font-medium">{row.keyword}</p>
                          <p className="text-xs text-muted-foreground">{row.primary_keyword}</p>
                          {flags?.duplicate && (
                            <Badge variant="outline" className="mt-1">
                              Trùng từ khóa
                            </Badge>
                          )}
                          {flags?.multipleUrls && (
                            <Badge variant="destructive" className="mt-1">
                              <AlertTriangle className="mr-1 size-3" />
                              Nhiều URL
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="max-w-64 whitespace-normal break-all">
                          {row.target_url ? (
                            <a
                              href={row.target_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline"
                            >
                              {row.target_url.replace("https://bocxepsaigon.vn", "") || "/"}
                            </a>
                          ) : (
                            "Chưa gán"
                          )}
                        </TableCell>
                        <TableCell>
                          <p>{lookup(GROUPS, row.keyword_group)}</p>
                          <p className="text-xs text-muted-foreground">
                            {lookup(INTENTS, row.search_intent)}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{lookup(STATUSES, row.content_status)}</Badge>
                        </TableCell>
                        <TableCell>P{row.priority}</TableCell>
                        <TableCell className="min-w-44">
                          <p>{lookup(SOURCES, row.evidence_source)}</p>
                          {stats ? (
                            <p className="text-xs text-muted-foreground">
                              {stats.clicks} nhấp · {stats.impressions} hiển thị
                              <br />
                              CTR {(stats.ctr * 100).toFixed(2)}% · VT {stats.position.toFixed(1)}
                              <br />
                              {stats.start_date} → {stats.end_date}
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              GSC: chưa có số liệu khớp
                            </p>
                          )}
                          {row.semrush_volume !== null && (
                            <p className="text-xs text-muted-foreground">
                              Semrush VN: ~{row.semrush_volume}/tháng · KD{" "}
                              {row.semrush_difficulty ?? "—"}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(row.updated_at).toLocaleDateString("vi-VN")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Sửa ${row.keyword}`}
                              title="Sửa từ khóa"
                              onClick={() => startEdit(row)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Xóa ${row.keyword}`}
                              title="Xóa từ khóa"
                              onClick={() => setDeleting(row)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <p>
              {rows.length} kết quả · Trang {currentPage + 1}/{lastPage + 1}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 0}
                onClick={() => setPage(currentPage - 1)}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                disabled={currentPage >= lastPage}
                onClick={() => setPage(currentPage + 1)}
              >
                Sau
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="gsc" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {gscNotice ||
                (evidence.length
                  ? `${evidence.length} bản ghi · Cập nhật ${new Date(evidence[0]?.fetched_at ?? "").toLocaleString("vi-VN")}`
                  : "Chưa đồng bộ dữ liệu Search Console")}
            </p>
            <Button variant="outline" disabled={gscBusy} onClick={() => refreshGsc()}>
              {gscBusy ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 size-4" />
              )}
              Cập nhật Search Console
            </Button>
          </div>
          {snapshots.isError && (
            <p role="alert" className="text-destructive">
              Không tải được số liệu Search Console.
            </p>
          )}
          <div className="max-w-full overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Truy vấn",
                    "Trang đích thực tế",
                    "Nhấp",
                    "Hiển thị",
                    "CTR",
                    "Vị trí TB",
                    "Kỳ đo",
                  ].map((title) => (
                    <TableHead key={title}>{title}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidence.length ? (
                  evidence.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="min-w-44 whitespace-normal">{row.query}</TableCell>
                      <TableCell className="max-w-64 break-all whitespace-normal">
                        {row.page_url}
                      </TableCell>
                      <TableCell>{row.clicks}</TableCell>
                      <TableCell>{row.impressions}</TableCell>
                      <TableCell>{(row.ctr * 100).toFixed(2)}%</TableCell>
                      <TableCell>{row.position.toFixed(2)}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {row.start_date} → {row.end_date}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      {snapshots.isLoading ? "Đang tải..." : "Chưa có truy vấn được ghi nhận."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!busy) setOpen(value);
        }}
      >
        <DialogContent className="max-h-[90svh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Chỉnh sửa từ khóa" : "Thêm từ khóa"}</DialogTitle>
            <DialogDescription>Bản đồ nội dung · Saigon Handling</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {TEXT_FIELDS.map(([key, label]) => {
                const array = ARRAY_FIELDS.some((field) => field === key);
                const current = form[key];
                const value = Array.isArray(current) ? current.join(" | ") : String(current ?? "");
                return (
                  <div
                    key={key}
                    className={key === "notes" || key === "meta_description" ? "sm:col-span-2" : ""}
                  >
                    <Label htmlFor={`keyword-${key}`}>{label}</Label>
                    {array || key === "notes" || key === "meta_description" ? (
                      <Textarea
                        id={`keyword-${key}`}
                        value={value}
                        placeholder={array ? "Mỗi mục cách nhau bằng dấu |" : ""}
                        onChange={(event) =>
                          update(
                            key,
                            array
                              ? event.target.value.split("|").map((v) => v.trim())
                              : event.target.value,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <Input
                        id={`keyword-${key}`}
                        required={key === "keyword"}
                        value={value}
                        onChange={(event) => update(key, event.target.value)}
                        className="mt-1"
                      />
                    )}
                  </div>
                );
              })}
              {[
                ["keyword_group", "Nhóm", GROUPS],
                ["search_intent", "Ý định", INTENTS],
                ["content_type", "Loại nội dung", TYPES],
                ["content_status", "Trạng thái", STATUSES],
                ["evidence_source", "Nguồn từ khóa", SOURCES],
              ].map(([key, label, options]) => (
                <div key={String(key)}>
                  <Label>{String(label)}</Label>
                  <Picker
                    label={String(label)}
                    value={String(form[String(key)] ?? "")}
                    onChange={(v) => update(String(key), v)}
                    options={options as Record<string, string>}
                  />
                </div>
              ))}
              <div>
                <Label>Ưu tiên</Label>
                <Picker
                  label="Ưu tiên"
                  value={String(form["priority"] ?? 2)}
                  onChange={(v) => update("priority", Number(v))}
                  options={{ "1": "P1 · Cao", "2": "P2 · Trung bình", "3": "P3 · Thấp" }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={busy}>
                {busy && <Loader2 className="mr-2 size-4 animate-spin" />}Lưu từ khóa
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(deleting)}
        onOpenChange={(value) => {
          if (!value && !busy) setDeleting(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa từ khóa?</DialogTitle>
            <DialogDescription>
              {deleting?.keyword} · Không xóa trang đích hoặc nội dung website.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" disabled={busy} onClick={() => setDeleting(null)}>
              Hủy
            </Button>
            <Button variant="destructive" disabled={busy} onClick={confirmDelete}>
              Xác nhận xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={pendingImport !== null}
        onOpenChange={(value) => {
          if (!value && !busy) setPendingImport(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nhập bảng từ khóa</DialogTitle>
            <DialogDescription>
              {pendingImport?.length ?? 0} dòng hợp lệ. Bỏ qua cặp từ khóa–URL đã tồn tại; không ghi
              đè dữ liệu hiện có.
            </DialogDescription>
          </DialogHeader>
          <ul className="max-h-40 overflow-y-auto text-sm">
            {pendingImport?.slice(0, 5).map((row, i) => (
              <li key={i}>
                {row.keyword} → {row.target_url || "Chưa gán"}
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-2">
            <Button variant="outline" disabled={busy} onClick={() => setPendingImport(null)}>
              Hủy
            </Button>
            <Button disabled={busy || !pendingImport?.length} onClick={confirmImport}>
              Xác nhận nhập
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={candidates.length > 0}
        onOpenChange={(value) => {
          if (!value && !gscBusy) setCandidates([]);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn hồ sơ Search Console</DialogTitle>
            <DialogDescription>Hồ sơ đã xác minh cho website.</DialogDescription>
          </DialogHeader>
          {candidates.map((candidate) => (
            <Button
              key={candidate}
              variant="outline"
              disabled={gscBusy}
              className="h-auto whitespace-normal break-all text-left"
              onClick={() => refreshGsc(candidate)}
            >
              {candidate}
            </Button>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
