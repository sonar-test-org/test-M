import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { persistStore } from "redux-persist";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import App from "./App";
import { customTheme } from "./theme/light/customTheme";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { ErrorFallback } from "./pages/ErrorPage";
import { render } from "react-dom";

import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";

let persistor = persistStore(store);

const root = document.getElementById("root");
const queryClient = new QueryClient({
  refetchOnWindowFocus: false,
});

render(
  <>
    <Router basename="/w360">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={customTheme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Router>
  </>,
  root
);
