import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  value: "LIGHT" | "DARK";
}

const getInitialTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const localStorageTheme = localStorage.getItem("theme");
  if (localStorageTheme) return localStorageTheme === "LIGHT" ? "LIGHT" : "DARK";
  return isDark ? "DARK" : "LIGHT";
}

const initialState: ThemeState = {
  value: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const isDark = state.value === "DARK";
      state.value = isDark ? "LIGHT" : "DARK";
      // If the user has manually set the theme, we will not change it when the system theme changes.
      const isDiffer =
        !isDark !== window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDiffer) localStorage.setItem("theme", state.value);
      else localStorage.removeItem("theme");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
