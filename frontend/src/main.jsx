import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import App from "./App.jsx"
import "./index.css"

const basename =
  import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "/"
    ? import.meta.env.BASE_URL.replace(/\/$/, "")
    : undefined;

const savedRedirect = sessionStorage.getItem("redirect");

if (savedRedirect) {
  sessionStorage.removeItem("redirect");

  const normalizedBase = basename ?? "";
  const normalizedPath = savedRedirect.startsWith(normalizedBase)
    ? savedRedirect.slice(normalizedBase.length) || "/"
    : savedRedirect;

  window.history.replaceState(null, "", `${normalizedBase}${normalizedPath}`);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
