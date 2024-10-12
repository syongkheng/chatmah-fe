import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Router from "./Routes";
import { LocaleProvider } from "./contexts/LocaleContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <RouterProvider router={Router} />
    </LocaleProvider>
  </React.StrictMode>,
);
