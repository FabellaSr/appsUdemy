import React from "react";
import { createRoot } from "react-dom/client";
import ProviderApp from "./ProviderApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderApp />
  </React.StrictMode>
);
