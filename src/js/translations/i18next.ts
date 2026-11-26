import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import privacy from "./pages/privacy";
import about from "./pages/about";
import settings from "./pages/settings";
import invite from "./pages/invite";
import groups from "./pages/groups";
import checkpoint from "./pages/checkpoint";
import timeAndCalendar from "./components/time-and-calendar.ts";
import trends from "./pages/trends";
import analytics from "./pages/analytics";
import error from "./pages/error";
import modal from "./pages/modal";
import login from "./pages/login";
import changelog from "./components/changelogs";
import titles from "./components/titles";
import actions from "./components/actions";
import generic from "./components/generic";

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
  timeAndCalendar,
  trends,
  analytics,
  error,
  modal,
  login,
  changelog,
  titles,
  actions,
  generic,
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
