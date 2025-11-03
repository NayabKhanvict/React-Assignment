import React from "react";

export function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {desc && <p className="mt-1 text-slate-500 text-sm">{desc}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-slate-700">
      {children}
    </span>
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 " +
        className
      }
    />
  );
}

export function Muted({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-500">{children}</p>;
}
