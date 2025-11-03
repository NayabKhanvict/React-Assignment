import { Link, useRouterState } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Sidebar() {
  const { location } = useRouterState();
  const path = location.pathname;

  const { disablePage1 } = useSelector((s: RootState) => s.flags);

  const item = (to: string, label: string) => (
    <Link
      to={to}
      className={[
        "block border-l-4 border-transparent px-4 py-2 text-slate-600 hover:bg-gray-50",
        path === to ? "border-blue-600 bg-blue-50 text-slate-900" : "",
      ].join(" ")}
    >
      {label}
    </Link>
  );

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="text-lg font-bold tracking-wide text-slate-900">
          Feature Flags App
        </div>
      </div>

      <nav className="flex-1 py-2">
        {!disablePage1 && item("/config", "Table Configuration")}

        {item("/table", "Data Table")}
        {item("/admin", "Admin Panel")}
      </nav>

      <div className="px-4 py-3 text-sm text-slate-500">
        Built with TS · RTK · RQ · Router
      </div>
    </aside>
  );
}
