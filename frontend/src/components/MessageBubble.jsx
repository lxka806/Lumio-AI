import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(message.content || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-up">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-md bg-hover border border-border px-4 py-3 text-[14.5px] leading-relaxed text-primary whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-start gap-3 animate-fade-up">
      <div className="h-7 w-7 shrink-0 rounded-full bg-lime/10 border border-lime/25 grid place-items-center mt-0.5">
        <span className="text-lime text-[11px] font-semibold">L</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] leading-relaxed text-primary">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1 marker:text-lime">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1 marker:text-secondary">{children}</ol>,
              code: ({ inline, children }) =>
                inline ? (
                  <code className="rounded bg-surface border border-border px-1.5 py-0.5 text-[13px] text-lime">{children}</code>
                ) : (
                  <pre className="rounded-xl bg-surface border border-border p-4 overflow-x-auto text-[13px] leading-relaxed mb-3">
                    <code>{children}</code>
                  </pre>
                ),
              a: ({ children, href }) => (
                <a href={href} className="text-lime hover:underline" target="_blank" rel="noreferrer">{children}</a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className="mt-1.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={copy} className="p-1 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors" aria-label="Copy">
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}