/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Code2,
  Undo2,
  Table as TableIcon,
  Youtube,
  MapPin,
  HelpCircle,
  Megaphone,
  Images,
  ListTree,
  ImagePlus,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { listRows, uploadMedia } from "@/lib/admin-db";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

type BlockKind = "table" | "youtube" | "map" | "faq" | "cta" | "gallery" | "link" | null;

const youtubeId = (input: string) => {
  const m = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : input.trim();
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [html, setHtml] = useState(false);
  const [block, setBlock] = useState<BlockKind>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [links, setLinks] = useState<{ label: string; href: string }[]>([]);

  // Block form state
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [faq, setFaq] = useState("Câu hỏi 1 | Trả lời 1\nCâu hỏi 2 | Trả lời 2");
  const [ctaTitle, setCtaTitle] = useState("Cần báo giá bốc xếp?");
  const [ctaText, setCtaText] = useState("Gọi ngay để nhận tư vấn miễn phí trong 5 phút.");
  const [ctaLabel, setCtaLabel] = useState("Nhận báo giá");
  const [ctaHref, setCtaHref] = useState("/#contact");

  useEffect(() => {
    if (!html && ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value, html]);

  const emit = () => onChange(ref.current?.innerHTML ?? "");

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const insert = (snippet: string) => {
    if (html) {
      onChange(`${value}\n${snippet}`);
      return;
    }
    ref.current?.focus();
    document.execCommand("insertHTML", false, `${snippet}<p><br/></p>`);
    emit();
  };

  const uploadFiles = async (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const file of images) {
        if (file.size > 8 * 1024 * 1024) {
          toast.error(`${file.name} vượt quá 8MB`);
          continue;
        }
        urls.push(await uploadMedia(file));
      }
      if (urls.length === 1) {
        insert(`<figure><img src="${urls[0]}" alt="" loading="lazy" /></figure>`);
      } else if (urls.length > 1) {
        insert(
          `<div class="post-gallery">${urls
            .map((u) => `<img src="${u}" alt="" loading="lazy" />`)
            .join("")}</div>`,
        );
      }
      if (urls.length) toast.success(`Đã tải ${urls.length} ảnh`);
    } catch (error: any) {
      toast.error(error?.message ?? "Tải ảnh thất bại");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const openLinkSelector = async () => {
    setBlock("link");
    try {
      const posts = await listRows("posts", { column: "sort_order", ascending: true });
      const internal = posts.map((p) => ({ label: p.title as string, href: `/blog/${p.slug}` }));
      setLinks([
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ", href: "/#services" },
        { label: "Bảng giá", href: "/#pricing" },
        { label: "Liên hệ", href: "/#contact" },
        { label: "Tất cả bài viết", href: "/blog" },
        ...internal,
      ]);
    } catch {
      setLinks([]);
    }
  };

  const insertToc = () => {
    const source = html ? value : (ref.current?.innerHTML ?? "");
    const doc = new DOMParser().parseFromString(source, "text/html");
    const heads = Array.from(doc.querySelectorAll("h2,h3"));
    if (heads.length === 0) {
      toast.error("Chưa có tiêu đề H2/H3 để tạo mục lục");
      return;
    }
    const items = heads
      .map((h, i) => {
        const id = `muc-${i + 1}`;
        return `<li class="${h.tagName === "H3" ? "ml-4" : ""}"><a href="#${id}">${h.textContent}</a></li>`;
      })
      .join("");
    insert(
      `<nav class="post-toc"><strong>Mục lục</strong><ol>${items}</ol></nav>`,
    );
    toast.success("Đã chèn mục lục (ID tiêu đề được tạo khi hiển thị bài viết)");
  };

  const tools: { icon: typeof Bold; label: string; run: () => void }[] = [
    { icon: Bold, label: "Đậm", run: () => exec("bold") },
    { icon: Italic, label: "Nghiêng", run: () => exec("italic") },
    { icon: Underline, label: "Gạch chân", run: () => exec("underline") },
    { icon: Heading2, label: "Tiêu đề 2", run: () => exec("formatBlock", "<h2>") },
    { icon: Heading3, label: "Tiêu đề 3", run: () => exec("formatBlock", "<h3>") },
    { icon: Quote, label: "Trích dẫn", run: () => exec("formatBlock", "<blockquote>") },
    { icon: List, label: "Danh sách", run: () => exec("insertUnorderedList") },
    { icon: ListOrdered, label: "Danh sách số", run: () => exec("insertOrderedList") },
    { icon: LinkIcon, label: "Liên kết nội bộ", run: openLinkSelector },
    { icon: ImagePlus, label: "Ảnh (nhiều ảnh)", run: () => fileRef.current?.click() },
    { icon: Images, label: "Thư viện ảnh", run: () => setBlock("gallery") },
    { icon: TableIcon, label: "Bảng", run: () => setBlock("table") },
    { icon: Youtube, label: "YouTube", run: () => setBlock("youtube") },
    { icon: MapPin, label: "Google Maps", run: () => setBlock("map") },
    { icon: HelpCircle, label: "Khối FAQ", run: () => setBlock("faq") },
    { icon: Megaphone, label: "Khối CTA", run: () => setBlock("cta") },
    { icon: ListTree, label: "Mục lục", run: insertToc },
    { icon: Undo2, label: "Hoàn tác", run: () => exec("undo") },
  ];

  const confirmBlock = () => {
    if (block === "table") {
      const head = `<tr>${Array.from({ length: cols }, (_, i) => `<th>Cột ${i + 1}</th>`).join("")}</tr>`;
      const body = Array.from(
        { length: Math.max(1, rows - 1) },
        () => `<tr>${Array.from({ length: cols }, () => "<td>&nbsp;</td>").join("")}</tr>`,
      ).join("");
      insert(`<table class="post-table"><thead>${head}</thead><tbody>${body}</tbody></table>`);
    }
    if (block === "youtube") {
      const id = youtubeId(url);
      if (!id) return;
      insert(
        `<div class="post-embed"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube" loading="lazy" allowfullscreen></iframe></div>`,
      );
    }
    if (block === "map") {
      const q = encodeURIComponent(address || url);
      if (!q) return;
      insert(
        `<div class="post-embed"><iframe src="https://www.google.com/maps?q=${q}&output=embed" title="Google Maps" loading="lazy"></iframe></div>`,
      );
    }
    if (block === "faq") {
      const items = faq
        .split("\n")
        .map((line) => line.split("|"))
        .filter((parts) => parts[0]?.trim())
        .map(
          (parts) =>
            `<details class="post-faq-item"><summary>${parts[0].trim()}</summary><p>${(parts[1] ?? "").trim()}</p></details>`,
        )
        .join("");
      insert(`<div class="post-faq">${items}</div>`);
    }
    if (block === "cta") {
      insert(
        `<div class="post-cta"><strong>${ctaTitle}</strong><p>${ctaText}</p><a class="post-cta-btn" href="${ctaHref}">${ctaLabel}</a></div>`,
      );
    }
    setBlock(null);
    setUrl("");
    setAddress("");
  };

  return (
    <div className="rounded-md border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-input bg-muted/40 p-1.5">
        {tools.map((tool) => (
          <Button
            key={tool.label}
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            title={tool.label}
            aria-label={tool.label}
            onClick={tool.run}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        ))}
        {busy ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
        <Button
          type="button"
          size="sm"
          variant={html ? "default" : "ghost"}
          className="ml-auto h-8 gap-1.5 text-xs"
          onClick={() => setHtml((v) => !v)}
        >
          <Code2 className="h-3.5 w-3.5" /> HTML
        </Button>
      </div>

      {html ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[320px] rounded-none border-0 font-mono text-xs focus-visible:ring-0"
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={emit}
          onBlur={emit}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            const files = Array.from(e.dataTransfer?.files ?? []);
            if (files.length) {
              e.preventDefault();
              setDragging(false);
              void uploadFiles(files);
            }
          }}
          className={cn(
            "prose-admin min-h-[320px] max-w-none px-4 py-3 text-sm outline-none",
            "[&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:font-bold",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
            "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_blockquote]:italic",
            "[&_a]:text-primary [&_a]:underline [&_p]:mb-2 [&_img]:rounded-md",
            "[&_table]:w-full [&_table]:border-collapse [&_td]:border [&_th]:border [&_td]:p-1.5 [&_th]:p-1.5",
            "[&_iframe]:aspect-video [&_iframe]:w-full [&_.post-cta]:rounded-md [&_.post-cta]:border [&_.post-cta]:p-3",
            "[&_.post-gallery]:grid [&_.post-gallery]:grid-cols-3 [&_.post-gallery]:gap-2",
            "[&_.post-toc]:rounded-md [&_.post-toc]:bg-muted [&_.post-toc]:p-3",
            dragging && "ring-2 ring-primary",
            "empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
          )}
        />
      )}

      <p className="border-t border-input px-3 py-1.5 text-xs text-muted-foreground">
        Kéo &amp; thả ảnh vào vùng soạn thảo để tải lên (hỗ trợ nhiều ảnh cùng lúc).
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => void uploadFiles(Array.from(e.target.files ?? []))}
      />

      <Dialog open={block !== null} onOpenChange={(o) => !o && setBlock(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {block === "table"
                ? "Chèn bảng"
                : block === "youtube"
                  ? "Chèn video YouTube"
                  : block === "map"
                    ? "Chèn Google Maps"
                    : block === "faq"
                      ? "Chèn khối FAQ"
                      : block === "cta"
                        ? "Chèn khối kêu gọi hành động"
                        : block === "gallery"
                          ? "Chèn thư viện ảnh"
                          : "Chọn liên kết nội bộ"}
            </DialogTitle>
          </DialogHeader>

          {block === "table" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Số dòng</Label>
                <Input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Số cột</Label>
                <Input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
              </div>
            </div>
          ) : null}

          {block === "youtube" ? (
            <div className="space-y-2">
              <Label>Link hoặc ID video</Label>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtu.be/..." />
            </div>
          ) : null}

          {block === "map" ? (
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="234 Tô Ngọc Vân, Thủ Đức, TP.HCM"
              />
            </div>
          ) : null}

          {block === "faq" ? (
            <div className="space-y-2">
              <Label>Mỗi dòng: Câu hỏi | Câu trả lời</Label>
              <Textarea rows={6} value={faq} onChange={(e) => setFaq(e.target.value)} />
            </div>
          ) : null}

          {block === "cta" ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Tiêu đề</Label>
                <Input value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Mô tả</Label>
                <Textarea rows={2} value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Nhãn nút</Label>
                  <Input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Liên kết</Label>
                  <Input value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} />
                </div>
              </div>
            </div>
          ) : null}

          {block === "gallery" ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Chọn nhiều ảnh để tạo thư viện dạng lưới 3 cột.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setBlock(null);
                  fileRef.current?.click();
                }}
              >
                <Images className="mr-1.5 h-4 w-4" /> Chọn ảnh
              </Button>
            </div>
          ) : null}

          {block === "link" ? (
            <div className="max-h-72 space-y-1 overflow-y-auto">
              {links.length === 0 ? (
                <p className="text-sm text-muted-foreground">Chưa có nội dung nội bộ.</p>
              ) : (
                links.map((l) => (
                  <button
                    key={l.href}
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      exec("createLink", l.href);
                      setBlock(null);
                    }}
                  >
                    <span className="truncate">{l.label}</span>
                    <span className="ml-2 shrink-0 text-xs text-muted-foreground">{l.href}</span>
                  </button>
                ))
              )}
            </div>
          ) : null}

          {block && !["gallery", "link"].includes(block) ? (
            <DialogFooter>
              <Button variant="outline" onClick={() => setBlock(null)}>
                Huỷ
              </Button>
              <Button onClick={confirmBlock}>Chèn</Button>
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
