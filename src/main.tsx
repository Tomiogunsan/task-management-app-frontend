import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";

import { store } from "store/index.ts";
import { Provider } from "react-redux";
import ErrorBoundary from "shared/ErrorBoundaryFallback/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
);
