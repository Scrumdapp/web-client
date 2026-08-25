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
                    privacy: {
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
                    privacy: {
                        header: '',
                        header1: '',
                        header2: '',
                        header3: '',
                        header4: '',
                        header5: '',
                        header6: '',
                        header7: '',
                        header8: '',
                        header9: '',

                        text1: '',
                        text2: {
                            point1: '',
                            point2: '',
                            point3: '',
                        },
                        text3: '',
                        text4: {
                            point1: '',
                            point2: '',
                        },
                        text5: '',
                        text6: '',
                        text7: '',
                        text8: '',
                        text9: '',
                        text10: '',
                        text11: {
                            point1: '',
                            point2: '',
                            point3: '',
                        },
                        text12: '',
                        text13: '',
                        link1: '',
                        link2: '',
                    }
                }
            }
        }
    });

export default i18n;