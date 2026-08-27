import i18n from "i18next";

i18n
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    footer: {
                        rights: '© 2026 Scrumdapp | All rights reserved',
                        about: 'About',
                        privacy: 'Privacy',
                        support: 'Support',
                    },
                }
            },
            nl: {
                translation: {
                    footer: {
                        rights: '© 2026 Scrumdapp | Alle rechten voorbehouden',
                        about: 'Over',
                        privacy: 'Privacy',
                        support: 'Ondersteuning',
                    },
                }
            }
        }
    })