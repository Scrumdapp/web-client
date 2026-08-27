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
import error from './pages/error.js';t
import header from './pages/header.js';
import footer from './pages/footer.js';
import date from './pages/date.js';
import modal from './pages/modal.js';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                }
            },
            nl: {
                translation: {
                }
            },
        }
    });

export default i18n;