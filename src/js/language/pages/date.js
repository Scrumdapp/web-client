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
                    date: {
                        mon: 'Monday',
                        tue: 'Tuesday',
                        wed: 'Wednesday',
                        thu: 'Thursday',
                        fri: 'Friday',
                        sat: 'Saturday',
                        sun: 'Sunday',
                        jan: 'January',
                        feb: 'February',
                        mar: 'March',
                        apr: 'April',
                        may: 'May',
                        jun: 'June',
                        jul: 'July',
                        aug: 'August',
                        sep: 'September',
                        oct: 'October',
                        nov: 'November',
                        dec: 'December',
                        unknown: '',
                    },
                }
            },
            nl: {
                translation: {
                    date: {
                        mon: 'Maandag',
                        tue: 'Dinsdag',
                        wed: 'Woensdag',
                        thu: 'Donderdag',
                        fri: 'Vrijdag',
                        sat: 'Zaterdag',
                        sun: 'Zondag',
                        jan: 'Januari',
                        feb: 'Februari',
                        mar: 'Maart',
                        apr: 'April',
                        may: 'Mei',
                        jun: 'Juni',
                        jul: 'Juli',
                        aug: 'Augustus',
                        sep: 'September',
                        oct: 'Oktober',
                        nov: 'November',
                        dec: 'December',
                        unknown: '',
                    },
                }
            }
        }
    })