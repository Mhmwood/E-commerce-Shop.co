import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store} >
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
