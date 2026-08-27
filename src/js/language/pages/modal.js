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
                    modal: {
                        cancel: 'Cancel',
                    },
                }
            },
            nl: {
                translation: {
                    modal: {
                        cancel: 'Annuleer',
                    },
                }
            }
        }
    })