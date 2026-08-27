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
                    settings: {
                        title: 'Settings | Scrumdapp',
                        header: 'Settings',
                        background: {
                            header: 'Background',
                            text: 'Current background',
                            change: 'Change background',
                        },
                    },
                }
            },
            nl: {
                translation: {
                    settings: {
                        title: 'Instellingen | Scrumdapp',
                        header: 'Instellingen',
                        background: {
                            header: 'Achtergrond',
                            text: 'Huidige achtergrond',
                            change: 'Verander achtergrond',
                        },
                    },
                }
            }
        }
    })