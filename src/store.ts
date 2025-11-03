import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

/** ---- Persistence helpers ---- */
const LS_KEY = "ff-app-state:v1";
type PersistShape = {
  config: { rows: number };
  flags: { disablePage1: boolean; disableSlider: boolean };
};

function load(): Partial<PersistShape> | undefined {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function save(state: PersistShape) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {}
}

/** ---- Slices ---- */
const persisted = load();

const configSlice = createSlice({
  name: "config",
  initialState: {
    rows: Math.min(10, Math.max(1, persisted?.config?.rows ?? 5)),
  },
  reducers: {
    setRows(state, action: PayloadAction<number>) {
      const v = Math.round(action.payload);
      state.rows = Math.max(1, Math.min(10, v));
    },
  },
});

const featureFlagsSlice = createSlice({
  name: "flags",
  initialState: {
    disablePage1: persisted?.flags?.disablePage1 ?? false,
    disableSlider: persisted?.flags?.disableSlider ?? false,
  },
  reducers: {
    setDisablePage1(state, action: PayloadAction<boolean>) {
      state.disablePage1 = action.payload;
    },
    setDisableSlider(state, action: PayloadAction<boolean>) {
      state.disableSlider = action.payload;
    },
  },
});

export const { setRows } = configSlice.actions;
export const { setDisablePage1, setDisableSlider } = featureFlagsSlice.actions;

export const store = configureStore({
  reducer: {
    config: configSlice.reducer,
    flags: featureFlagsSlice.reducer,
  },
});

store.subscribe(() => {
  const s = store.getState();
  save({
    config: { rows: s.config.rows },
    flags: {
      disablePage1: s.flags.disablePage1,
      disableSlider: s.flags.disableSlider,
    },
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
