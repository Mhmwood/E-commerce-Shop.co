// store/middleware/localStorage.ts
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";

export const localStorageMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    // First perform the action
    const result = next(action);

    // Then handle persistence
    if (action.type?.startsWith("cart/")) {
      try {
        const state = store.getState().cart;
        localStorage.setItem("cart", JSON.stringify(state));
      } catch (error) {
        console.warn("Error saving cart state:", error);
      }
    }

    return result;
  };

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.warn("Error loading cart state:", error);
    return undefined;
  }
};
