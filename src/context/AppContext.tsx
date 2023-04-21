/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";

export enum Theme {
  Dark = "Dark",
  Light = "Light",
}

export type AppContextType = {
  lang: string;
  theme: Theme;
  setTheme: (Theme: Theme) => void;
  showBacklink: boolean;
  setShowBacklink: (show: boolean) => void;
  showHeader: boolean;
  setShowHeader: (show: boolean) => void;
  showSplotches: boolean;
  setShowSplotches: (show: boolean) => void;
};

export const AppContext = React.createContext<AppContextType>({
  lang: "en",
  theme: Theme.Dark,
  setTheme: (_theme) => console.warn("no theme provider"),
  showBacklink: false,
  setShowBacklink: (_showBacklink) => console.warn("no showBacklink provider"),
  showHeader: false,
  setShowHeader: (_showHeader) => console.warn("no showHeader provider"),
  showSplotches: false,
  setShowSplotches: (_showHeader) => console.warn("no showSplotches provider"),
});
export const useAppContext = () => useContext(AppContext);
