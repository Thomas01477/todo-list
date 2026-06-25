import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import "./index.css";
import Form from "./components/Form.jsx";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1>Ma To-Do List par Catégories</h1>
    <Form />
  </StrictMode>
);
