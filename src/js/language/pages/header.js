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
                    header: {
                        home: 'Home',
                        groups: 'Groups',
                        profile: 'Profile',
                        logout: 'Logout',
                    },
                }
            },
            nl: {
                translation: {
                    header: {
                        home: 'Hoofdpagina',
                        groups: 'Groepen',
                        profile: 'Profiel',
                        logout: 'Uitloggen',
                    },
                }
            }
        }
    })