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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(false);

  useEffect(() => {
    if (!html && ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value, html]);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
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
    {
      icon: LinkIcon,
      label: "Liên kết",
      run: () => {
        const url = window.prompt("Nhập đường dẫn liên kết:");
        if (url) exec("createLink", url);
      },
    },
    { icon: Undo2, label: "Hoàn tác", run: () => exec("undo") },
  ];

  return (
    <div className="rounded-md border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-input p-1.5">
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
          className="min-h-[240px] rounded-none border-0 font-mono text-xs focus-visible:ring-0"
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
          className={cn(
            "prose-admin min-h-[240px] max-w-none px-3 py-2 text-sm outline-none",
            "[&_h2]:mt-3 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:font-bold",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
            "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_blockquote]:italic",
            "[&_a]:text-primary [&_a]:underline [&_p]:mb-2",
            "empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
          )}
        />
      )}
    </div>
  );
}
