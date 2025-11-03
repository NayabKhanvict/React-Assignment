import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../lib/api";
import type { RootState } from "../store";
import { Card, Badge, Button } from "../components/UI";

export default function DataTablePage() {
  const rows = useSelector((s: RootState) => s.config.rows);
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60_000,
  });

  return (
    <Card
      title="Data Table"
      desc={
        <span className="text-slate-500">
          Showing <b className="text-slate-900">{rows}</b> row
          {rows > 1 ? "s" : ""} based on your configuration.
        </span>
      }
    >
      <div className="mb-4 flex items-center justify-between">
        <div />
        <div className="flex items-center gap-2">
          <Badge>{isFetching ? "Refreshing…" : "Fresh"}</Badge>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Refetch
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-slate-700">
          Loading posts…
        </div>
      )}
      {isError && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
          Error: {(error as Error)?.message ?? "Unknown error"}
        </div>
      )}

      {!!data && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-slate-600">
                <th className="px-4 py-3 w-20 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Body</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, rows).map((p) => (
                <tr key={p.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 align-top text-slate-900">{p.id}</td>
                  <td className="px-4 py-3 align-top text-slate-900">
                    {p.title}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-600">
                    {p.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
