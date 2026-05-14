import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import App from "./App";
import DemoPage from "./routes/demo";
import "./styles/index.css";

const router = createHashRouter([
  { path: "/", element: <App /> },
  { path: "/demo", element: <DemoPage /> },
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
