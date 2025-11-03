import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/UI";
import { setDisablePage1, setDisableSlider, type RootState } from "../store";

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-slate-700">{label}</div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={
          "relative h-6 w-11 rounded-full border transition " +
          (checked
            ? "border-blue-600 bg-blue-600/20"
            : "border-gray-300 bg-gray-200")
        }
      >
        <span
          className={
            "absolute top-1 h-4 w-4 rounded-full transition " +
            (checked ? "left-6 bg-blue-600 shadow" : "left-1 bg-white shadow")
          }
        />
      </button>
    </div>
  );
}

export default function AdminPage() {
  const dispatch = useDispatch();
  const { disablePage1, disableSlider } = useSelector(
    (s: RootState) => s.flags
  );

  return (
    <Card title="Admin Panel" desc="Feature flag controls (persisted).">
      <div className="space-y-2">
        <Toggle
          label="Disable Page 1 (Table Configuration) entirely"
          checked={disablePage1}
          onChange={(v) => dispatch(setDisablePage1(v))}
        />
        <p className="text-xs text-slate-500 -mt-1">
          When enabled, navigation to{" "}
          <code className="text-slate-800">/config</code> will redirect to{" "}
          <code className="text-slate-800">/table</code>.
        </p>

        <Toggle
          label="Disable only the slider input on Page 1"
          checked={disableSlider}
          onChange={(v) => dispatch(setDisableSlider(v))}
        />
        <p className="text-xs text-slate-500 -mt-1">
          Number input remains available.
        </p>
      </div>
    </Card>
  );
}
