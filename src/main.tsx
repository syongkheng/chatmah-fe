import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Router from "./Routes";
import { LocaleProvider } from "./contexts/LocaleContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </LocaleProvider>
  </React.StrictMode>,
);
