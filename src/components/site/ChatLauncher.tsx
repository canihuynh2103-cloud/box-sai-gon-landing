import { lazy, Suspense, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatWidget = lazy(() => import("./ChatWidget"));

export function ChatLauncher() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="chat-launcher fixed z-40 size-12 rounded-full shadow-[var(--shadow-glow)]"
        aria-label="Mở trợ lý SAIGON HANDLING"
        aria-expanded={open}
        title="Trợ lý SAIGON HANDLING"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        <MessageCircle className="size-6" />
      </Button>
      {loaded && (
        <Suspense
          fallback={
            <p
              role="status"
              className="chat-loading fixed z-50 rounded-md border border-border bg-background p-3 text-sm"
            >
              Đang mở trợ lý…
            </p>
          }
        >
          <ChatWidget open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  );
}
