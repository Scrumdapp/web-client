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
                    groups: {
                        title: 'Groups | Scrumdapp',
                        newgroup: 'New group',
                        nogroups: 'No groups have been found...',
                    },
                }
            },
            nl: {
                translation: {
                    groups: {
                        title: 'Groepen | Scrumdapp',
                        newgroup: 'Nieuwe groep',
                        nogroups: 'Geen groepen gevonden...',
                    },
                }
            }
        }
    })