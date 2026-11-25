import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ChatStatus, UIMessage } from "ai";
import { ArrowUp, FileText, Phone, RotateCcw, X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { QuoteButton } from "@/components/site/QuoteButton";
import { HOTLINE, HOTLINE_TEL, ZALO_LINK } from "@/data/site";
import logo from "@/assets/logo-header.png.asset.json";
import { chatFrameSchema, chatRequestSchema } from "@/lib/chat-contract";

const greeting: UIMessage = {
  id: "greeting",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Xin chào! Tôi là trợ lý AI của SAIGON HANDLING. Bạn đang cần bốc xếp, thuê nhân công hay chuyển nhà/kho/văn phòng?",
    },
  ],
};
const suggestions = [
  "Tôi cần bốc xếp container",
  "Thuê nhân công theo giờ",
  "Tư vấn chuyển văn phòng",
];

export default function ChatWidget({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<UIMessage[]>([greeting]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const handingOff = useRef(false);
  const busy = status === "submitted" || status === "streaming";
  const focus = () => requestAnimationFrame(() => textarea.current?.focus({ preventScroll: true }));
  useEffect(() => {
    if (open && !busy) focus();
  }, [open, busy]);
  useEffect(() => () => abort.current?.abort(), []);

  async function send(text: string) {
    text = text.trim();
    if (!text || busy || abort.current) return;
    const user: UIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text }],
    };
    const history = [...messages, user];
    const payload = {
      messages: history
        .filter((m) => m.id !== "greeting")
        .flatMap((m) => {
          const content = m.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("");
          return content ? [{ role: m.role, content }] : [];
        }),
    };
    if (!chatRequestSchema.safeParse(payload).success) {
      setError(
        "Tin nhắn tối đa 2.000 ký tự; nếu hội thoại quá dài, hãy bắt đầu cuộc trò chuyện mới.",
      );
      return;
    }
    if (!navigator.onLine) {
      setError("Bạn đang mất kết nối. Tin nhắn vẫn được giữ; hãy thử lại khi có mạng.");
      setInput(text);
      return;
    }
    setMessages(history);
    setInput("");
    setError("");
    setStatus("submitted");
    focus();
    const controller = new AbortController();
    abort.current = controller;
    const assistantId = crypto.randomUUID();
    let responseText = "";
    let done = false;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok || !response.body)
        throw new Error(
          "Trợ lý chưa thể trả lời lúc này. Bạn có thể gọi hotline hoặc liên hệ Zalo.",
        );
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const chunk = await reader.read();
        buffer += chunk.done ? decoder.decode() : decoder.decode(chunk.value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const frame = chatFrameSchema.parse(JSON.parse(line));
          if (frame.type === "error") throw new Error(frame.message);
          if (frame.type === "done") done = true;
          if (frame.type === "delta") {
            responseText += frame.text;
            setStatus("streaming");
            const reply: UIMessage = {
              id: assistantId,
              role: "assistant",
              parts: [{ type: "text", text: responseText }],
            };
            setMessages([...history, reply]);
          }
        }
        if (chunk.done) break;
      }
      if (!done) throw new Error("Kết nối bị gián đoạn. Phần trả lời đã nhận vẫn được giữ.");
      setStatus("ready");
    } catch (e) {
      if (controller.signal.aborted) {
        setError("Đã dừng trả lời. Phần nội dung đã nhận được giữ trong phiên.");
        setStatus("ready");
      } else {
        setError(
          e instanceof Error
            ? e.message
            : "Không thể kết nối. Vui lòng thử lại hoặc liên hệ hotline.",
        );
        setStatus("error");
      }
    } finally {
      abort.current = null;
      focus();
    }
  }

  async function copySummary() {
    try {
      const summary = messages
        .filter((m) => m.role === "user")
        .map((m) =>
          m.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join(""),
        )
        .join("\n");
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setError("Không thể sao chép tự động. Bạn có thể chọn nội dung hội thoại để sao chép.");
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className="chat-panel fixed z-50 flex flex-col overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-[var(--shadow-lift)] outline-none"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            focus();
          }}
          onInteractOutside={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            if (handingOff.current) {
              handingOff.current = false;
              return;
            }
            document.querySelector<HTMLButtonElement>(".chat-launcher")?.focus();
          }}
        >
          <header className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-3">
            <img
              src={logo.url}
              alt="SAIGON CARGO HANDLING"
              width="159"
              height="36"
              className="h-6 w-20 shrink-0 object-contain"
            />
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title className="text-sm font-bold">
                Trợ lý SAIGON HANDLING
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-xs text-muted-foreground">
                Tư vấn tự động · Nhân viên xác nhận báo giá
              </DialogPrimitive.Description>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              title="Cuộc trò chuyện mới"
              aria-label="Bắt đầu cuộc trò chuyện mới"
              disabled={busy}
              onClick={() => {
                setMessages([greeting]);
                setInput("");
                setError("");
                setCopied(false);
                focus();
              }}
            >
              <RotateCcw />
            </Button>
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                title="Đóng trợ lý"
                aria-label="Đóng trợ lý"
              >
                <X />
              </Button>
            </DialogPrimitive.Close>
          </header>
          <Conversation className="min-h-0" aria-label="Hội thoại tư vấn" aria-live="polite">
            <ConversationContent className="gap-5 p-3">
              {messages.map((m) => (
                <Message from={m.role} key={m.id} className="max-w-full">
                  <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground">
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        m.role === "assistant" ? (
                          <MessageResponse
                            key={i}
                            isAnimating={busy}
                            className="break-words text-sm [&_a]:text-primary"
                          >
                            {part.text}
                          </MessageResponse>
                        ) : (
                          <p key={i} className="whitespace-pre-wrap break-words">
                            {part.text}
                          </p>
                        )
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-col items-start gap-2">
                  {suggestions.map((q) => (
                    <Button
                      variant="outline"
                      key={q}
                      className="h-auto max-w-full whitespace-normal text-left text-xs"
                      onClick={() => void send(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              )}
              {status === "submitted" && (
                <div role="status">
                  <Shimmer className="motion-reduce:animate-none">Đang trả lời…</Shimmer>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton aria-label="Đến tin nhắn mới nhất" />
          </Conversation>
          <div className="shrink-0 border-t border-border p-3">
            {error && (
              <p role="alert" className="mb-2 text-xs text-destructive">
                {error}
              </p>
            )}
            {messages.length > 1 && (
              <div className="mb-2 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => void copySummary()}>
                  <FileText />
                  {copied ? "Đã sao chép" : "Sao chép nhu cầu"}
                </Button>
                <span
                  onClick={() => {
                    handingOff.current = true;
                    window.setTimeout(() => onOpenChange(false), 0);
                    window.setTimeout(() => {
                      document
                        .querySelector<HTMLInputElement>('#lien-he input[name="name"]')
                        ?.focus({ preventScroll: true });
                    }, 800);
                  }}
                >
                  <QuoteButton className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Mở form báo giá
                  </QuoteButton>
                </span>
                <p className="w-full text-[11px] text-muted-foreground">
                  Chưa gửi yêu cầu. Vui lòng xác nhận gửi trên form hoặc liên hệ Zalo.
                </p>
              </div>
            )}
            <PromptInput onSubmit={({ text }) => send(text)} maxFiles={0}>
              <PromptInputTextarea
                ref={textarea}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={2000}
                aria-label="Tin nhắn tư vấn"
                placeholder="Bạn cần hỗ trợ dịch vụ nào?"
                className="min-h-16 max-h-28 text-base"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit
                  status={status}
                  onStop={() => abort.current?.abort()}
                  disabled={!busy && !input.trim()}
                  aria-label={busy ? "Dừng trả lời" : "Gửi tin nhắn"}
                  className="size-9"
                >
                  {!busy && <ArrowUp />}
                </PromptInputSubmit>
              </PromptInputFooter>
            </PromptInput>
            <div className="mt-2 flex items-center justify-between gap-2">
              <Button asChild variant="link" className="h-auto p-0 text-xs">
                <a href={`tel:${HOTLINE_TEL}`}>
                  <Phone />
                  {HOTLINE}
                </a>
              </Button>
              <Button asChild variant="link" className="h-auto p-0 text-xs">
                <a href={ZALO_LINK} target="_blank" rel="noopener noreferrer">
                  Liên hệ Zalo
                </a>
              </Button>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
              Bạn tự nguyện cung cấp liên hệ để được tư vấn; không gửi dữ liệu nhạy cảm. Tin nhắn
              được chuyển đến dịch vụ AI và chỉ giữ trong phiên tại đây.{" "}
              <a href="/chinh-sach-bao-mat" className="underline">
                Chính sách bảo mật
              </a>
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
