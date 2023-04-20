import { createTheme } from "@material-ui/core/styles";
import { createGlobalStyle } from "styled-components";

export const styledComponentsTheme = {
  NIHR: {
    LighterGreen: "#46a86c",
    Green: "#00703c",
    LinkBlue: "#1d70b8",
    LightBlue: "#47658e",
    Blue: "#193e72",
    DarkestBlue: "#0e2e5a",
    Yellow: "#fed47a",
    BackgroundGrey: "#eef2f3",
    LightGrey: "#acbcc3",
    Grey: "#919191",
    PrimaryDarkGrey: "#212529",
    Orange: "#ee7d71",
    Red: "#d4351c",
    PrimaryWhite: "#ffffff",
    ErrorRed: "#d5281b",
  },
};

export const AppRoot = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif !important;
  }
`;

// I Imagine this can be replaced with the styled component theme.
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    nhsnavy: Palette["primary"];
  }
  interface PaletteOptions {
    nhsnavy: PaletteOptions["primary"];
  }
}

// I Imagine this can be replaced with the styled component theme.
export default createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      light: "#4d68a1",
      main: "#193e72",
      dark: "#001946",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff8f7a",
      main: "#ea5d4e",
      dark: "#b22a25",
      contrastText: "#1d1d1b",
    },
    nhsnavy: {
      light: "rgba(25,62,114,0.60)",
      main: "rgba(25,62,114,0.80)",
      dark: "rgba(25,62,114,1.0)",
      contrastText: "#000",
    },
  },
});
