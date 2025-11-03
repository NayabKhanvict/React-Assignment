import { useDispatch, useSelector } from "react-redux";
import { type RootState, setRows } from "../store";
import { Card, Button, Muted } from "../components/UI";
import { Link } from "@tanstack/react-router";

export default function ConfigPage() {
  const dispatch = useDispatch();
  const value = useSelector((s: RootState) => s.config.rows);
  const disableSlider = useSelector((s: RootState) => s.flags.disableSlider);

  return (
    <Card
      title="Table Configuration"
      desc="Set how many rows to show on the Data Table page (1–10)."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Slider
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            disabled={disableSlider}
            onChange={(e) => dispatch(setRows(Number(e.target.value)))}
            className="w-full accent-blue-600 disabled:opacity-50"
          />
          {disableSlider && (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Slider is disabled by a feature flag. Use the number input
              instead.
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Number
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={value}
            onChange={(e) => dispatch(setRows(Number(e.target.value || 1)))}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Muted>Current rows:</Muted>
        <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 font-semibold text-slate-900">
          {value}
        </span>
        <Link to="/table">
          <Button className="ml-2">View Data Table</Button>
        </Link>
      </div>
    </Card>
  );
}
