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
                    about: {
                        title: 'About | Scrumdapp',
                        header: 'About Scrumdapp',
                        text1: 'The Ultimate SCRUM tool for your team!',
                        text2: 'Scrumdapp was born out of frustration of not being able to easily manage the daily stand-ups from a team or project.\n We have brought you an easy way to keep track of this using a easy-to-understand UI, great accessibility and many security and privacy features in the design.',
                        team: 'Our Team:',
                    },
                }
            },
            nl: {
                translation: {
                    about: {
                        title: 'Over | Scrumdapp',
                        header: 'Over Scrumdapp',
                        text1: 'The Ultimate SCRUM tool for your team!',
                        text2: 'Scrumdapp was born out of frustration of not being able to easily manage the daily stand-ups from a team or project.\n We have brought you an easy way to keep track of this using a easy-to-understand UI, great accessibility and many security and privacy features in the design.',
                        team: 'Ons Team:',
                    },
                }
            }
        }
    })

export default i18n;