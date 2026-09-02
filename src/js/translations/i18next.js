import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import privacy from './pages/privacy.js';
import about from './pages/about.js';
import settings from './pages/settings.js';
import invite from './pages/invite.js';
import groups from './pages/groups.js';
import checkpoint from './pages/checkpoint.js';
import calendar from './pages/calendar.js';
import trends from './pages/trends.js';
import error from './pages/error.js';
import header from './pages/header.js';
import footer from './pages/footer.js';
import date from './pages/date.js';
import modal from './pages/modal.js';

const pages = [
    privacy, about, settings, invite, groups, checkpoint,
    calendar, trends, error, header, footer, date, modal,
];

const resources = pages.reduce((acc, page) => {
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
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources,
    });

export default i18n;