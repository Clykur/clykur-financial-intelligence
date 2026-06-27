import React from "react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#14141c] text-white">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="relative flex flex-col items-center space-y-4">
        {/* Animated logo container */}
        <div className="relative h-16 w-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-amber-500/20 opacity-25 blur-xl animate-pulse" />
          <div className="relative h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="font-display font-black text-xl text-[#14141c]">C</span>
          </div>
          {/* Spinner Ring */}
          <div className="absolute -inset-2 rounded-2xl border-2 border-amber-500/10 border-t-amber-500 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="font-display text-lg font-bold tracking-tight text-white">Clykur</h2>
          <p className="text-xs text-slate-400 animate-pulse">
            Initializing SaaS financial intelligence engine...
          </p>
        </div>
      </div>
    </div>
  );
}
