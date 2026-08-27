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
                    error: {
                        title: 'Page not found | Scrumdapp',
                        goback: 'Go back',
                    },
                }
            },
            nl: {
                translation: {
                    error: {
                        title: 'Pagina niet gevonden | Scrumdapp',
                        goback: 'Ga terug',
                    },
                }
            }
        }
    })