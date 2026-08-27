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
                    trends: {
                        title: 'Trends | Scrumdapp',
                        header: 'Presence',
                        periodic: 'Periodic',
                        cumulative: 'Cumulative',
                        twoweeks: 'Last 2 weeks',
                        sixmonths: 'Last 6 months',
                    },
                }
            },
            nl: {
                translation: {
                    trends: {
                        title: 'Trends | Scrumdapp',
                        header: 'Aanwezigheid',
                        periodic: 'Periodiek',
                        cumulative: 'Cumulatief',
                        twoweeks: 'Afgelopen 2 weken',
                        sixmonths: 'Afgelopen 6 maanden',
                    },
                }
            }
        }
    })