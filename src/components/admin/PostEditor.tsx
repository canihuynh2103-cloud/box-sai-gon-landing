/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Eye,
  Loader2,
  Save,
  Search,
  Settings2,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { saveRowReturning, slugify, type Row } from "@/lib/admin-db";
import { cn } from "@/lib/utils";

const toLocalInput = (value?: string | null) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fromLocalInput = (value: string) => (value ? new Date(value).toISOString() : null);

/** Any DB value (null, number, array, object) coerced to a safe controlled-input string. */
const str = (value: unknown): string => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).map(String).join(", ");
  if (typeof value === "object") return "";
  return String(value);
};

export const readingTimeOf = (html: unknown) => {
  const text = str(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
};

function Counter({ value, min, max }: { value?: string | null; min: number; max: number }) {
  const n = str(value).length;
  const ok = n >= min && n <= max;
  return (
    <p className={cn("text-xs", n === 0 ? "text-muted-foreground" : ok ? "text-emerald-600" : "text-destructive")}>
      {n}/{max} ký tự {n === 0 ? "" : ok ? "— tốt" : `— nên trong khoảng ${min}-${max}`}
    </p>
  );
}

const TEXT_FIELDS = [
  "title",
  "slug",
  "category",
  "excerpt",
  "content",
  "cover_image_alt",
  "seo_title",
  "seo_description",
  "seo_keywords",
  "focus_keyword",
  "canonical_url",
  "og_title",
  "og_description",
  "author",
  "tags",
] as const;

type Props = { post: Row | null; onClose: () => void };

export function PostEditor({ post, onClose }: Props) {
  const qc = useQueryClient();
  const [id, setId] = useState<string | undefined>(post?.id);
  const [values, setValues] = useState<Row>(() => ({
    ...(post ?? {}),
    // Normalize every text field so nulls/arrays/numbers from the DB never reach
    // a controlled input as a non-string value.
    ...Object.fromEntries(TEXT_FIELDS.map((key) => [key, str(post?.[key])])),
    status: str(post?.status) || "draft",
    sort_order: Number(post?.sort_order ?? 0) || 0,
    cover_image: typeof post?.cover_image === "string" ? post.cover_image : null,
    og_image: typeof post?.og_image === "string" ? post.og_image : null,
  }));
  const [publishedAt, setPublishedAt] = useState(toLocalInput(post?.published_at));
  const [scheduledAt, setScheduledAt] = useState(toLocalInput(post?.scheduled_at));
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [preview, setPreview] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!post?.slug);
  const dirty = useRef(false);

  const set = (name: string, value: any) => {
    dirty.current = true;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const readingTime = useMemo(() => readingTimeOf(String(values.content ?? "")), [values.content]);

  useEffect(() => {
    if (!autoSlug) return;
    setValues((prev) => ({ ...prev, slug: slugify(String(prev.title ?? "")) }));
  }, [values.title, autoSlug]);

  const buildPayload = useCallback((): Row => {
    const tags = String(values.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const scheduledIso = fromLocalInput(scheduledAt);
    const publishedIso = fromLocalInput(publishedAt);
    return {
      title: String(values.title ?? "").trim() || "Bài viết chưa có tiêu đề",
      slug: String(values.slug ?? "").trim() || slugify(String(values.title ?? "")) || `bai-viet-${Date.now()}`,
      category: values.category || null,
      excerpt: values.excerpt || null,
      content: values.content ?? "",
      cover_image: values.cover_image || null,
      cover_image_alt: values.cover_image_alt || null,
      status: values.status ?? "draft",
      sort_order: Number(values.sort_order ?? 0),
      seo_title: values.seo_title || null,
      seo_description: values.seo_description || null,
      seo_keywords: values.seo_keywords || null,
      focus_keyword: values.focus_keyword || null,
      canonical_url: values.canonical_url || null,
      og_title: values.og_title || null,
      og_description: values.og_description || null,
      og_image: values.og_image || null,
      author: values.author || null,
      tags,
      reading_time: readingTimeOf(String(values.content ?? "")),
      published_at: publishedIso ?? (values.status === "published" ? new Date().toISOString() : null),
      scheduled_at: scheduledIso,
    };
  }, [values, publishedAt, scheduledAt]);

  const persist = useCallback(
    async (opts?: { silent?: boolean; status?: string }) => {
      setSaving(true);
      try {
        const payload = buildPayload();
        if (opts?.status) payload.status = opts.status;
        if (opts?.status === "published" && !payload.published_at) {
          payload.published_at = new Date().toISOString();
        }
        const newId = await saveRowReturning("posts", payload, id);
        setId(newId);
        dirty.current = false;
        setLastSaved(new Date());
        if (opts?.status) setValues((prev) => ({ ...prev, status: opts.status }));
        if (payload.published_at) setPublishedAt(toLocalInput(payload.published_at));
        qc.invalidateQueries({ queryKey: ["admin", "posts"] });
        qc.invalidateQueries({ queryKey: ["content"] });
        if (!opts?.silent) toast.success("Đã lưu bài viết");
        return newId;
      } catch (error: any) {
        toast.error(error?.message ?? "Lưu thất bại");
        throw error;
      } finally {
        setSaving(false);
      }
    },
    [buildPayload, id, qc],
  );

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!dirty.current || saving) return;
      if (!String(values.title ?? "").trim()) return;
      void persist({ silent: true }).catch(() => undefined);
    }, 30_000);
    return () => clearInterval(timer);
  }, [persist, saving, values.title]);

  const schedule = async () => {
    if (!scheduledAt) {
      toast.error("Chọn thời điểm hẹn xuất bản trước");
      return;
    }
    setPublishedAt(scheduledAt);
    setValues((prev) => ({ ...prev, status: "published" }));
    dirty.current = true;
    const payload = buildPayload();
    payload.status = "published";
    payload.published_at = fromLocalInput(scheduledAt);
    try {
      const newId = await saveRowReturning("posts", payload, id);
      setId(newId);
      dirty.current = false;
      setLastSaved(new Date());
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      toast.success("Đã hẹn giờ xuất bản");
    } catch (error: any) {
      toast.error(error?.message ?? "Hẹn giờ thất bại");
    }
  };

  const seoTitle = String(values.seo_title || values.title || "");
  const seoDesc = String(values.seo_description || values.excerpt || "");
  const slug = String(values.slug ?? "");
  const focus = String(values.focus_keyword ?? "").toLowerCase().trim();
  const focusChecks = focus
    ? [
        { label: "Có trong tiêu đề", ok: seoTitle.toLowerCase().includes(focus) },
        { label: "Có trong đường dẫn", ok: slug.includes(slugify(focus)) },
        { label: "Có trong mô tả", ok: seoDesc.toLowerCase().includes(focus) },
        {
          label: "Có trong nội dung",
          ok: String(values.content ?? "").toLowerCase().includes(focus),
        },
      ]
    : [];

  return (
    <div className="space-y-4">
      {/* Gutenberg-style top bar */}
      <div className="sticky top-0 z-20 -mx-4 flex flex-wrap items-center gap-2 border-b bg-card/95 px-4 py-2.5 backdrop-blur md:-mx-6 md:px-6">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Danh sách
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <span className="text-xs text-muted-foreground">
          {saving ? (
            <span className="inline-flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Đang lưu...
            </span>
          ) : lastSaved ? (
            `Đã lưu ${lastSaved.toLocaleTimeString("vi-VN")}`
          ) : (
            "Chưa lưu"
          )}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreview(true)}>
            <Eye className="mr-1.5 h-4 w-4" /> Xem trước
          </Button>
          <Button variant="outline" size="sm" onClick={() => void persist({ status: "draft" })}>
            <Save className="mr-1.5 h-4 w-4" /> Lưu nháp
          </Button>
          <Button size="sm" onClick={() => void persist({ status: "published" })} disabled={saving}>
            {values.status === "published" ? "Cập nhật" : "Xuất bản"}
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        {/* Editor canvas */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4 md:p-6">
            <Textarea
              value={values.title ?? ""}
              onChange={(e) => set("title", e.target.value)}
              rows={1}
              placeholder="Thêm tiêu đề"
              className="resize-none border-0 px-0 font-heading text-2xl font-bold shadow-none focus-visible:ring-0 md:text-3xl"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Đường dẫn:</span>
              <Input
                value={slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  set("slug", e.target.value);
                }}
                className="h-7 w-56 text-xs"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => set("slug", slugify(String(values.title ?? "")))}
              >
                Tạo từ tiêu đề
              </Button>
              <Badge variant="secondary">{readingTime} phút đọc</Badge>
            </div>
          </div>

          <RichTextEditor
            value={String(values.content ?? "")}
            onChange={(html) => set("content", html)}
            placeholder="Bắt đầu viết hoặc chèn khối nội dung..."
          />

          <div className="space-y-2 rounded-lg border bg-card p-4">
            <Label>Mô tả ngắn (excerpt)</Label>
            <Textarea
              rows={3}
              value={values.excerpt ?? ""}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Tóm tắt ngắn hiển thị ở danh sách bài viết"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Tabs defaultValue="post">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="post">
                <Settings2 className="mr-1.5 h-3.5 w-3.5" /> Bài viết
              </TabsTrigger>
              <TabsTrigger value="seo">
                <Search className="mr-1.5 h-3.5 w-3.5" /> SEO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="post" className="space-y-4">
              <div className="space-y-4 rounded-lg border bg-card p-4">
                <div className="space-y-2">
                  <Label>Trạng thái</Label>
                  <Select value={values.status ?? "draft"} onValueChange={(v) => set("status", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Đã xuất bản</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tác giả</Label>
                  <Input
                    value={values.author ?? ""}
                    onChange={(e) => set("author", e.target.value)}
                    placeholder="Bốc Xếp Sài Gòn"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ngày xuất bản</Label>
                  <Input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => {
                      dirty.current = true;
                      setPublishedAt(e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hẹn giờ xuất bản</Label>
                  <Input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => {
                      dirty.current = true;
                      setScheduledAt(e.target.value);
                    }}
                  />
                  <Button type="button" size="sm" variant="outline" onClick={() => void schedule()}>
                    <CalendarClock className="mr-1.5 h-3.5 w-3.5" /> Đặt lịch
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Bài viết sẽ tự động hiển thị công khai khi đến thời điểm hẹn.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Cập nhật lần cuối</Label>
                  <p className="text-sm text-muted-foreground">
                    {post?.updated_at
                      ? new Date(post.updated_at).toLocaleString("vi-VN")
                      : "Chưa có"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <Input
                    value={values.category ?? ""}
                    onChange={(e) => set("category", e.target.value)}
                    placeholder="Bốc Xếp Kho Hàng"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="inline-flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" /> Thẻ (tags)
                  </Label>
                  <Input
                    value={values.tags ?? ""}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="bốc xếp, kho hàng, logistics"
                  />
                  <div className="flex flex-wrap gap-1">
                    {String(values.tags ?? "")
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Thứ tự</Label>
                  <Input
                    type="number"
                    value={values.sort_order ?? 0}
                    onChange={(e) => set("sort_order", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-lg border bg-card p-4">
                <Label>Ảnh bìa</Label>
                <ImageUpload value={values.cover_image} onChange={(url) => set("cover_image", url)} />
                <div className="space-y-2">
                  <Label>Alt text của ảnh</Label>
                  <Input
                    value={values.cover_image_alt ?? ""}
                    onChange={(e) => set("cover_image_alt", e.target.value)}
                    placeholder="Công nhân bốc xếp hàng trong kho"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <EditorErrorBoundary label="PostEditor.seo">
                <div className="space-y-4">
                  <div className="space-y-3 rounded-lg border bg-card p-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Xem trước trên Google
                    </p>
                    <div className="rounded-md border bg-background p-3">
                      <p className="text-xs text-muted-foreground">
                        bocxepsaigon.vn › blog › {slug || "duong-dan"}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-base text-[#1a0dab]">
                        {seoTitle || "Tiêu đề SEO của bài viết"}
                      </p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {seoDesc || "Mô tả meta sẽ hiển thị ở đây."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-lg border bg-card p-4">
                    <div className="space-y-2">
                      <Label htmlFor="seo-title">SEO title</Label>
                      <Input
                        id="seo-title"
                        value={str(values.seo_title)}
                        onChange={(e) => set("seo_title", e.target.value)}
                      />
                      <Counter value={seoTitle} min={30} max={60} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seo-description">Meta description</Label>
                      <Textarea
                        id="seo-description"
                        rows={3}
                        value={str(values.seo_description)}
                        onChange={(e) => set("seo_description", e.target.value)}
                      />
                      <Counter value={seoDesc} min={70} max={160} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="focus-keyword">Focus keyword</Label>
                      <Input
                        id="focus-keyword"
                        value={str(values.focus_keyword)}
                        onChange={(e) => set("focus_keyword", e.target.value)}
                        placeholder="bốc xếp kho hàng"
                      />
                      <div className="space-y-1">
                        {focusChecks.map((c) => (
                          <p
                            key={c.label}
                            className={cn(
                              "flex items-center gap-1.5 text-xs",
                              c.ok ? "text-emerald-600" : "text-muted-foreground",
                            )}
                          >
                            <Check className="h-3 w-3" /> {c.label}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seo-keywords">SEO keywords</Label>
                      <Input
                        id="seo-keywords"
                        value={str(values.seo_keywords)}
                        onChange={(e) => set("seo_keywords", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="canonical-url">Canonical URL</Label>
                      <Input
                        id="canonical-url"
                        value={str(values.canonical_url)}
                        onChange={(e) => set("canonical_url", e.target.value)}
                        placeholder="/blog/duong-dan-bai-viet"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 rounded-lg border bg-card p-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Open Graph
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="og-title">OG title</Label>
                      <Input
                        id="og-title"
                        value={str(values.og_title)}
                        onChange={(e) => set("og_title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="og-description">OG description</Label>
                      <Textarea
                        id="og-description"
                        rows={3}
                        value={str(values.og_description)}
                        onChange={(e) => set("og_description", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>OG image</Label>
                      <ImageUpload
                        value={typeof values.og_image === "string" ? values.og_image : null}
                        onChange={(url) => set("og_image", url)}
                      />
                    </div>
                  </div>
                </div>
              </EditorErrorBoundary>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Xem trước bài viết</DialogTitle>
          </DialogHeader>
          <article className="space-y-3">
            {values.cover_image ? (
              <img
                src={values.cover_image}
                alt={values.cover_image_alt ?? ""}
                className="w-full rounded-md object-cover"
              />
            ) : null}
            <h1 className="font-heading text-2xl font-bold uppercase md:text-3xl">
              {values.title || "Chưa có tiêu đề"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {values.author || "Bốc Xếp Sài Gòn"} ·{" "}
              {publishedAt ? new Date(publishedAt).toLocaleDateString("vi-VN") : "Chưa xuất bản"} ·{" "}
              {readingTime} phút đọc
            </p>
            <div
              className="post-content text-sm"
              dangerouslySetInnerHTML={{ __html: String(values.content ?? "") }}
            />
          </article>
        </DialogContent>
      </Dialog>
    </div>
  );
}
