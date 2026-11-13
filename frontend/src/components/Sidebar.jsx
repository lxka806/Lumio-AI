import { useState } from "react";
import {
  Plus, MessageSquare, Trash2, Settings, LogOut, PanelLeftClose, Search,
} from "lucide-react";

export default function Sidebar({
  user,
  conversations,
  conversationId,
  sidebarOpen,
  onToggleSidebar,
  onNewChat,
  onOpenConversation,
  onDeleteConversation,
  onLogout,
}) {
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) =>
    (c.title || "Untitled").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex h-full w-[min(90vw,20rem)] min-w-[18rem]
        flex-col bg-sidebar border-r border-border shrink-0
        transition-all duration-300 ease-out overflow-hidden
        md:relative md:inset-auto md:z-auto md:min-w-0 md:translate-x-0
        ${sidebarOpen
          ? "translate-x-0 md:w-72 lg:w-80"
          : "-translate-x-full md:w-0 md:border-r-0"}
      `}
    >
      {/* Wordmark */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between min-w-[18rem]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-lime/10 border border-lime/20 grid place-items-center">
            <span className="text-lime text-sm font-semibold">L</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-primary">
            LUMIO
          </span>
        </div>
        <button
          className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-hover transition-colors"
          aria-label="Collapse sidebar"
          onClick={onToggleSidebar}
        >
          <PanelLeftClose size={16} />
        </button>
      </div>

      {/* New Chat */}
      <div className="px-3 pb-3 min-w-[18rem]">
        <button
          onClick={onNewChat}
          className="group w-full flex items-center justify-center gap-2 rounded-xl bg-lime-gradient text-[#06110A] font-medium text-sm py-2.5 hover:brightness-105 active:brightness-95 transition-all shadow-lime-glow"
        >
          <Plus size={16} strokeWidth={2.5} className="transition-transform group-hover:rotate-90" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2 min-w-[18rem]">
        <div className="flex items-center gap-2 rounded-lg bg-surface border border-border px-3 py-2 focus-within:border-lime/40 transition-colors">
          <Search size={14} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-[13px] text-primary placeholder:text-muted outline-none"
          />
        </div>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-2 py-2 min-w-[18rem]">
        <div className="px-3 pb-1.5 text-[11px] uppercase tracking-wider text-muted">
          Conversations
        </div>
        {filtered.length === 0 ? (
          <div className="px-3 py-6 text-[13px] text-muted">No conversations yet.</div>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((c) => {
              const active = c._id === conversationId;
              return (
                <li key={c._id}>
                  <div
                    onClick={() => onOpenConversation(c._id)}
                    className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                      active
                        ? "bg-hover text-primary"
                        : "text-secondary hover:bg-hover hover:text-primary"
                    }`}
                  >
                    <MessageSquare
                      size={15}
                      className={active ? "text-lime" : "text-muted group-hover:text-secondary"}
                    />
                    <span className="flex-1 truncate text-[13.5px]">
                      {c.title || "Untitled"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(c._id);
                      }}
                      className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-1 rounded-md text-muted hover:text-primary hover:bg-[#243026] transition-all"
                      aria-label="Delete conversation"
                    >
                      <Trash2 size={14} />
                    </button>
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-lime" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* User profile */}
      <div className="border-t border-border p-3 min-w-[18rem]">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-hover transition-colors">
          <div className="h-8 w-8 rounded-full bg-surface border border-border grid place-items-center text-[12px] font-medium text-lime">
            {(user?.name || user?.email || "U").slice(0, 1).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-primary truncate">
              {user?.name || "User"}
            </div>
            <div className="text-[11.5px] text-muted truncate">{user?.email || ""}</div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors" aria-label="Settings">
              <Settings size={14} />
            </button>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}