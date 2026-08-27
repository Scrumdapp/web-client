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
                    calendar: {
                        title: 'Calendar | Scrumdapp',
                        mon: 'Mon',
                        tue: 'Tue',
                        wed: 'Wed',
                        thu: 'Thu',
                        fri: 'Fri',
                        sat: 'Sat',
                        sun: 'Sun',
                    },
                }
            },
            nl: {
                translation: {
                    calendar: {
                        title: 'Kalender | Scrumdapp',
                        mon: 'Maa',
                        tue: 'Din',
                        wed: 'Woe',
                        thu: 'Don',
                        fri: 'Vri',
                        sat: 'Zat',
                        sun: 'Zon',
                    },
                }
            }
        }
    })