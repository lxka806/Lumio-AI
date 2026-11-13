import { PanelLeft, LogOut, AlertCircle } from "lucide-react";

export default function Header({ onToggleSidebar, onLogout, appError }) {
  return (
    <header className="shrink-0 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="h-14 px-4 sm:px-6 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-hover transition-colors"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-lime/10 border border-lime/20 grid place-items-center">
            <span className="text-lime text-[11px] font-semibold">L</span>
          </div>
          <span className="text-[14px] font-medium tracking-wide text-primary">
            Lumio
          </span>
        </div>

        <div className="flex-1" />

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] text-secondary hover:text-primary hover:bg-hover transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      {appError && (
        <div className="px-4 sm:px-6 pb-2">
          <div className="flex items-center gap-2 rounded-lg border border-[#5A2D2D] bg-[#241717] px-3 py-2 text-[12.5px] text-[#F0A0A0]">
            <AlertCircle size={14} />
            {appError}
          </div>
        </div>
      )}
    </header>
  );
}