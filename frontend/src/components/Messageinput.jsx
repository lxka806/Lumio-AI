import { useRef, useEffect } from "react";
import { ArrowUp, Paperclip } from "lucide-react";

export default function MessageInput({ input, setInput, onSend, loading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // App.jsx's sendMessage expects an event with preventDefault() — a synthetic one is fine here.
      onSend(e);
    }
  };

  return (
    <div className="shrink-0 px-3 sm:px-8 lg:px-12 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-5 pt-2 bg-gradient-to-t from-bg via-bg to-transparent">
      <div className="mx-auto w-full max-w-3xl">
        <form
          onSubmit={onSend}
          className="rounded-2xl border border-border bg-surface focus-within:border-lime/40 focus-within:shadow-lime-focus transition-all"
        >
          <div className="flex items-end gap-2 px-3 py-2.5">
            <button
              type="button"
              className="p-2 rounded-lg text-muted hover:text-primary hover:bg-hover transition-colors shrink-0"
              aria-label="Attach"
            >
              <Paperclip size={17} />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask Lumio anything..."
              className="flex-1 resize-none bg-transparent text-[14.5px] leading-relaxed text-primary placeholder:text-muted outline-none py-1.5 max-h-[200px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-lime-gradient shrink-0 h-9 w-9 rounded-xl text-[#06110A] grid place-items-center disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:brightness-95 transition-all shadow-lime-glow"
              aria-label="Send message"
            >
              <ArrowUp size={17} strokeWidth={2.5} />
            </button>
          </div>
        </form>
        <p className="text-center text-[11px] text-muted mt-2.5">
          Lumio can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}