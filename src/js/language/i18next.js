import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    logout: 'Logout',
                    footer: {
                        rights: '© 2026 Scrumdapp | All rights reserved',
                        about: 'About',
                        privacy: 'Privacy',
                        support: 'Support',
                    },
                    modal: {
                        cancel: 'Cancel',
                    },
                    checkpoint: {
                        create: 'Create checkpoint',
                        refresh: 'Refresh',
                        table1: 'Name',
                        table2: 'Attendance',
                        table3: 'Stars',
                        table4: 'Comment',
                        table5: 'Obstacle',
                        table6: 'Edit',
                        modalheader: 'Edit checkpoint for',
                        modal1: 'Attendance',
                        modal2: 'Stars',
                        modal3: 'Notes',
                        modal4: 'Obstacle',
                        saving: 'Saving...',
                        apply: 'Apply',
                        closed: 'Checkpoint closed',
                        closesin: 'Checkpoint closes in',
                        modal: {
                            newcheckpoint: 'New checkpoint',
                            error: 'Only letters, numbers and spaces are allowed.',
                            create: 'Create',
                        },
                        sidebar: {
                            today: 'Today',
                            calendar: 'Calendar',
                            trends: 'Trends',
                            settings: 'Settings',
                            recent: 'Recent',
                        },
                    },
                    settings: {
                        title: 'Settings | Scrumdapp',
                        header: 'Settings',
                    },
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
                    trends: {
                        title: 'Trends | Scrumdapp',
                        header: 'Presence',
                    },
                    about: {
                        title: 'About | Scrumdapp',
                        header: 'About Scrumdapp',
                        text1: 'The Ultimate SCRUM tool for your team!',
                        text2: 'Scrumdapp was born out of frustration of not being able to easily manage the daily stand-ups from a team or project.\n We have brought you an easy way to keep track of this using a easy-to-understand UI, great accessibility and many security and privacy features in the design.',
                        team: 'Our Team:',
                    },
                    error: {
                        title: 'Page not found | Scrumdapp',
                        goback: 'Go back',
                    },
                    invite: {
                        title: 'Accept invite | Scrumdapp',
                        header: 'You\'re invited to',
                        text: 'Enter your given password underneath.',
                        join: 'Join',
                        noinvites: 'No active invites.',
                        expire: 'Expires at',
                        modal: {
                            error: 'Only letters, numbers and spaces and !@#$%^& are allowed.',
                            create: 'Create',
                            header: 'Invite others to group.',
                            text: 'Copy and share this generated link with your team.',
                            link: 'Link:',
                            copy: 'Copy link',
                            done: 'Done',
                            succes: 'Link copied to clipboard!',
                        },
                    },
                    groups: {
                        title: 'Groups | Scrumdapp',
                        newgroup: 'New group',
                        nogroups: 'No groups have been found...',
                    },
                    privacy: {
                        title: 'Privacy | Scrumdapp',
                        header: 'Privacy:',
                        header1: 'What personal information do we collect?',
                        header2: 'Why do we collect this information?',
                        header3: 'Which personal information is visible to others?',
                        header4: 'Lifetime personal information',
                        header5: 'Sharing data with third parties',
                        header6: 'Usage of cookies or similar technologies',
                        header7: 'Viewing, modifying & deleting your information',
                        header8: 'How we protect personal information?',
                        header9: 'Questions & Complaints',

                        text1: 'To ensure that Scrumdapp functions we store the following personal information upon logging in:',
                        text2: {
                            point1: 'Full name (retrieved from the Open-ICT Discord server)',
                            point2: 'Discord user identifier',
                            point3: 'Link to public Discord avatar',
                        },
                        text3: 'We use the information mentioned above for the following goals:',
                        text4: {
                            point1: 'To identify & authorize users',
                            point2: 'To ensure we can deliver our services',
                        },
                        text5: 'Your name is visible for other users whenever you share a group with them.',
                        text6: 'We avoid storing your personal information longer than necessary in order to complete the above mentioned goals.',
                        text7: 'We don\'t share your personal information to any third party.\n However, information may be shared with your explicit approval or due to legal obligations.',
                        text8: 'We use cookies in our services. These cookies are purely functional and strictly necessary to deliver our services.',
                        text9: 'You have the right to see, adjust and delete your personal information.\n In addition, you have the right to lodge an objection against the use and/or processing of your personal information by Scrumdapp.',
                        text10: 'We take fitting measures to protect your personal information against malicious use, theft and loss.\n To do this we use a combination of the following measures:',
                        text11: {
                            point1: 'TLS: All (sub-)domains in use by Scrumdapp provide a valid, strong encrypted ssl-certificate.',
                            point2: 'Firewall: Scrumdapp is hosted behind firewalls maintained by the University of Applied Sciences Utrecht and TandemIt.',
                            point3: 'Databases: All information and backups of this information are stored on databases hosted within the Open-ICT/TandemIt cloud environment.',
                        },
                        text12: 'If you have questions about this privacy notice, your personal information or how Scrumdapp handles information, please reach out at',
                        text13: 'or on',
                        link1: ' info@scrumdapp.com ',
                        link2: ' our contact page',
                    }
                }
            },
            nl: {
                translation: {
                    logout: 'Uitloggen',
                    footer: {
                        rights: '© 2026 Scrumdapp | Alle rechten voorbehouden',
                        about: 'Over',
                        privacy: 'Privacy',
                        support: 'Ondersteuning',
                    },
                    modal: {
                        cancel: '',
                    },
                    checkpoint: {
                        create: 'Nieuw checkpoint',
                        refresh: 'Herlaad',
                        table1: 'Naam',
                        table2: 'Aanwezigheid',
                        table3: 'Sterren',
                        table4: 'Opmerking',
                        table5: 'Obstakel',
                        table6: 'Bewerk',
                        modalheader: 'Bewerk checkpoint voor',
                        modal1: 'Aanwezigheid',
                        modal2: 'Sterren',
                        modal3: 'Opmerkingen',
                        modal4: 'Obstakels',
                        saving: 'Opslaan...',
                        apply: 'Opslaan',
                        closed: 'Checkpoint gesloten',
                        closesin: 'Checkpoint sluit over',
                        modal: {
                            newcheckpoint: 'Nieuw checkpoint',
                            error: 'Alleen letters, cijfers en spaties zijn toegestaan.',
                            create: 'Maak aan',
                        },
                        sidebar: {
                            today: 'Vandaag',
                            calendar: 'Kalender',
                            trends: 'Trends',
                            settings: 'Instellingen',
                            recent: 'Recent',
                        },
                    },
                    settings: {
                        title: 'Instellingen | Scrumdapp',
                        header: 'Instellingen',
                        background: {
                            header: 'Achtergrond',
                            text: 'Huidige achtergrond',
                            change: 'Verander achtergrond',
                        },
                    },
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
                    trends: {
                        title: 'Trends | Scrumdapp',
                        header: 'Aanwezigheid',
                    },
                    about: {
                        title: 'Over | Scrumdapp',
                        header: 'Over Scrumdapp',
                        text1: 'The Ultimate SCRUM tool for your team!',
                        text2: 'Scrumdapp was born out of frustration of not being able to easily manage the daily stand-ups from a team or project.\n We have brought you an easy way to keep track of this using a easy-to-understand UI, great accessibility and many security and privacy features in the design.',
                        team: 'Ons Team:',
                    },
                    error: {
                        title: 'Pagina niet gevonden | Scrumdapp',
                        goback: 'Ga terug',
                    },
                    invite: {
                        title: 'Accepteer Uitnodiging | Scrumdapp',
                        accept: {
                            header: 'jij bent uitgenodigd voor',
                            text: 'Enter your given password underneath.',
                            join: 'Neem deel',
                        },
                        header: 'Alle uitnodigingen',
                        create: 'Maak uitnodiging',
                        noinvites: 'Geen actieve uitnodigingen',
                        expire: 'Verloopt op',
                        expired: 'Verlopen',
                        modal: {
                            error: 'Alleen letters, nummer, spaties en !@#$%^& zijn toegestaan.',
                            create: 'Maak aan',
                            header: 'Nodig anderen uit om deel te nemen aan de groep.',
                            text: 'Kopieer en deel deze link met je team.',
                            link: 'Link:',
                            copy: 'Kopieer',
                            done: 'Klaar',
                            succes: 'Link gekopieerd naar klembord!',
                        },
                    },
                    groups: {
                        title: 'Groepen | Scrumdapp',
                        newgroup: 'Nieuwe groep',
                        nogroups: 'Geen groepen gevonden...',
                    },
                    privacy: {
                        title: 'Privacy | Scrumdapp',
                        header: 'Privacy:',
                        header1: 'What personal information do we collect?',
                        header2: 'Why do we collect this information?',
                        header3: 'Which personal information is visible to others?',
                        header4: 'Lifetime personal information',
                        header5: 'Sharing data with third parties',
                        header6: 'Usage of cookies or similar technologies',
                        header7: 'Viewing, modifying & deleting your information',
                        header8: 'How we protect personal information?',
                        header9: 'Questions & Complaints',

                        text1: 'To ensure that Scrumdapp functions we store the following personal information upon logging in:',
                        text2: {
                            point1: 'Full name (retrieved from the Open-ICT Discord server)',
                            point2: 'Discord user identifier',
                            point3: 'Link to public Discord avatar',
                        },
                        text3: 'We use the information mentioned above for the following goals:',
                        text4: {
                            point1: 'To identify & authorize users',
                            point2: 'To ensure we can deliver our services',
                        },
                        text5: 'Your name is visible for other users whenever you share a group with them.',
                        text6: 'We avoid storing your personal information longer than necessary in order to complete the above mentioned goals.',
                        text7: 'We don\'t share your personal information to any third party.\n However, information may be shared with your explicit approval or due to legal obligations.',
                        text8: 'We use cookies in our services. These cookies are purely functional and strictly necessary to deliver our services.',
                        text9: 'You have the right to see, adjust and delete your personal information.\n In addition, you have the right to lodge an objection against the use and/or processing of your personal information by Scrumdapp.',
                        text10: 'We take fitting measures to protect your personal information against malicious use, theft and loss.\n To do this we use a combination of the following measures:',
                        text11: {
                            point1: 'TLS: All (sub-)domains in use by Scrumdapp provide a valid, strong encrypted ssl-certificate.',
                            point2: 'Firewall: Scrumdapp is hosted behind firewalls maintained by the University of Applied Sciences Utrecht and TandemIt.',
                            point3: 'Databases: All information and backups of this information are stored on databases hosted within the Open-ICT/TandemIt cloud environment.',
                        },
                        text12: 'If you have questions about this privacy notice, your personal information or how Scrumdapp handles information, please reach out at',
                        text13: 'or on',
                        link1: ' info@scrumdapp.com ',
                        link2: ' our contact page',
                    }
                }
            },
        }
    });

export default i18n;