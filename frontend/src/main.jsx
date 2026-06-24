import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Form from "./components/Form.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1>Ma To-Do List par Catégories</h1>
    <Form />
  </StrictMode>
);
