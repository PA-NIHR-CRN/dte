import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-GB": {
    translation: {
      about: "about",
      UserLogin: "UserLogin",
      participants: "participants",
      register: "register",
      Options: "Options",
      "Email address": "Email address",
      // Add other paths
    },
  },
  "cy-GB": {
    translation: {
      about: "amdanom",
      // Welsh translations for the paths
      UserLogin: "MewngofnodiDefnyddiwr",
      participants: "cyfranogwyr",
      register: "cofrestr",
      Options: "Opsiynau",
      "Email address": "Cyfeiriad e-bost",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en-GB",
  interpolation: {
    escapeValue: false,
  },
});
