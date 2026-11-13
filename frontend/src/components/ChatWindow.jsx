import { useEffect, useRef } from "react";
import { Sparkles, Lightbulb, Code2, PenLine } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const isEmpty = messages.length === 0;

  if (isEmpty && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center animate-fade-up">
          <div className="mx-auto mb-7 h-14 w-14 rounded-2xl bg-lime/10 border border-lime/25 grid place-items-center">
            <Sparkles size={22} className="text-lime" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary">
            Your mind. <span className="text-lime">Your AI.</span>
          </h1>
          <p className="mt-3 text-[15px] text-secondary">
            A personal intelligence that grows with you.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Lightbulb, label: "Brainstorm ideas" },
              { icon: Code2,     label: "Write code" },
              { icon: PenLine,   label: "Draft a message" },
              { icon: Sparkles,  label: "Explain a concept" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-left"
              >
                <span className="h-8 w-8 rounded-lg bg-bg border border-border grid place-items-center text-secondary">
                  <Icon size={15} />
                </span>
                <span className="text-[13.5px] text-primary">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-8"
    >
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {loading && <TypingIndicator />}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-up">
      <div className="h-7 w-7 shrink-0 rounded-full bg-lime/10 border border-lime/25 grid place-items-center">
        <span className="text-lime text-[11px] font-semibold">L</span>
      </div>
      <div className="rounded-2xl rounded-tl-md bg-surface border border-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}