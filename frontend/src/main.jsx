import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import "./index.css";
import Form from "./components/Form.jsx";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracing(),
      Sentry.replay(),
    ],
    traces_sample_rate: 1.0,
    replays_session_sample_rate: 0.1,
    replays_on_error_sample_rate: 1.0,
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1>Ma To-Do List par Catégories</h1>
    <Form />
  </StrictMode>
);
