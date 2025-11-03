import React from "react";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-full bg-gray-50 text-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
