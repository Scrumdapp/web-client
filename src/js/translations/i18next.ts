import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import privacy from "./pages/privacy";
import about from "./pages/about";
import settings from "./pages/settings";
import invite from "./pages/invite";
import groups from "./pages/groups";
import checkpoint from "./pages/checkpoint";
import calendar from "./pages/calendar";
import trends from "./pages/trends";
import error from "./pages/error";
import header from "./pages/header";
import footer from "./pages/footer";
import date from "./pages/date";
import modal from "./pages/modal";
import login from "./pages/login";

type TranslationStrings = Record<string, unknown>;
type PageModule = Record<string, TranslationStrings>;
type Resources = Record<string, { translation: TranslationStrings }>;

const pages: PageModule[] = [
  privacy,
  about,
  settings,
  invite,
  groups,
  checkpoint,
  calendar,
  trends,
  error,
  header,
  footer,
  date,
  modal,
  login,
];

const resources = pages.reduce<Resources>((acc, page) => {
  Object.entries(page).forEach(([lang, strings]) => {
    acc[lang] = acc[lang] || { translation: {} };
    Object.assign(acc[lang].translation, strings);
  });
  return acc;
}, {});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
