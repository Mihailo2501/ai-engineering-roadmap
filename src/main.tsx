import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import App from "./App";
import "./styles/index.css";

const DemoPage = lazy(() => import("./routes/demo"));

function Fallback() {
  return (
    <main className="min-h-screen flex items-center justify-center font-display text-ink-soft text-sm tracking-[0.4em] uppercase">
      charting...
    </main>
  );
}

const router = createHashRouter([
  { path: "/", element: <App /> },
  {
    path: "/demo",
    element: (
      <Suspense fallback={<Fallback />}>
        <DemoPage />
      </Suspense>
    ),
  },
]);

const mdxComponents = {};

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root missing from index.html");
}

createRoot(rootEl).render(
  <StrictMode>
    <MDXProvider components={mdxComponents}>
      <RouterProvider router={router} />
    </MDXProvider>
  </StrictMode>
);
