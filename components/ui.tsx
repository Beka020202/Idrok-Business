"use client";

// Shared design-system widgets. Screens must use these, never raw colours.
import type { ReactNode, ButtonHTMLAttributes } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card bg-card p-5 shadow-card ${className}`}>{children}</div>;
}

type Tone = "blue" | "green" | "yellow" | "red" | "purple";
const toneClass: Record<Tone, string> = {
  blue: "bg-brand-soft text-brand",
  green: "bg-success-soft text-success-ink",
  yellow: "bg-warning-soft text-warning-ink",
  red: "bg-danger-soft text-danger-ink",
  purple: "bg-ai/10 text-ai",
};

export function Pill({ children, tone = "blue" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "glass" };

export function Button({ variant = "primary", className = "", ...props }: BtnProps) {
  const base =
    "press h-[50px] rounded-btn px-5 text-[15px] font-bold inline-flex items-center justify-center gap-2";
  const style = variant === "primary" ? "btn-primary" : "glass text-ink";
  return <button className={`${base} ${style} ${className}`} {...props} />;
}

export function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
      <div
        className="h-full rounded-full bg-gradient-to-b from-brand-light to-brand transition-[width] duration-[600ms] ease-calm"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function LockIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2.5" fill="currentColor" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Locked content: the real content is blurred underneath, a glass layer with a padlock sits on top.
export function Locked({ children, title, hint }: { children: ReactNode; title: string; hint: string }) {
  return (
    <div className="relative overflow-hidden rounded-card shadow-card">
      <div className="pointer-events-none select-none blur-md" aria-hidden="true">
        {children}
      </div>
      <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <div className="text-brand">
          <LockIcon />
        </div>
        <div className="text-base font-extrabold text-ink">{title}</div>
        <div className="text-sm text-muted">{hint}</div>
      </div>
    </div>
  );
}
