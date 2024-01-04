import { NHSApp } from "./AuthTypes";

declare global {
  interface Window {
    nhsapp: NHSApp;
  }
}
