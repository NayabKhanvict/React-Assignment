import "./index.css";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  redirect,
} from "@tanstack/react-router";

import AppLayout from "./layouts/AppLayout";
import ConfigPage from "./pages/ConfigPage";
import DataTablePage from "./pages/DataTablePage";
import AdminPage from "./pages/AdminPage";
import { Card, Button } from "./components/UI";

/** ---- Query Client ---- */
const qc = new QueryClient();

/** ---- Root & child routes ---- */
const rootRoute = createRootRoute({ component: AppLayout });

const configRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/config",
  beforeLoad: () => {
    const state = store.getState();
    if (state.flags.disablePage1) throw redirect({ to: "/table" });
  },
  component: ConfigPage,
});

const tableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/table",
  component: DataTablePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Card title="Welcome" desc="Use the sidebar to navigate.">
      <div className="flex gap-3">
        <Link to="/config">
          <Button>Go to Configuration</Button>
        </Link>
        <Link to="/table">
          <Button className="bg-green-600 hover:bg-green-700">
            Open Data Table
          </Button>
        </Link>
      </div>
    </Card>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  configRoute,
  tableRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/** ---- Bootstrap ---- */
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
