import { useTranslation, Trans } from "react-i18next";

export default function Privacy() {
    const { t } = useTranslation();

    return (
        <div className="app-container">
            <title>
                <Trans i18nKey="privacy.title">Privacy | Scrumdapp</Trans>
            </title>
            <div className="card text-block">
                <h1>
                    <Trans i18nKey="privacy.header">Privacy:</Trans>
                </h1>
                <h2>
                    <Trans i18nKey="privacy.header1">What personal information do we collect?</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text1">To ensure that Scrumdapp functions we store the following personal information upon logging in:</Trans>
                </p>
                <ul>
                    <Trans i18nKey="privacy.text2.point1"><li>Full name (retrieved from the Open-ICT Discord server)</li></Trans>
                    <Trans i18nKey="privacy.text2.point2"><li>Discord user identifier</li></Trans>
                    <Trans i18nKey="privacy.text2.point3"><li>Link to public Discord avatar</li></Trans>
                </ul>

                <h2>
                    <Trans i18nKey="privacy.header2">Why do we collect this information?</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text3">We use the information mentioned above for the following goals:</Trans>
                </p>
                <ul>
                    <Trans i18nKey="privacy.text4.point1"><li>To identify & authorize users</li></Trans>
                    <Trans i18nKey="privacy.text4.point2"><li>To ensure we can deliver our services</li></Trans>
                </ul>

                <h2>
                    <Trans i18nKey="privacy.header3">Which personal information is visible to others?</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text5">Your name is visible for other users whenever you share a group with them.</Trans>
                </p>

                <h2>
                    <Trans i18nKey="privacy.header4">Lifetime personal information</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text6">We avoid storing your personal information longer than necessary in order to complete the above mentioned goals.</Trans>
                </p>

                <h2>
                    <Trans i18nKey="privacy.header5">Sharing data with third parties</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text7">We don't share your personal information to any third party.
                        However, information may be shared with your explicit approval or due to legal obligations.</Trans>
                </p>

                <h2>
                    <Trans i18nKey="privacy.header6">Usage of cookies or similar technologies</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text8">We use cookies in our services. These cookies are purely functional and strictly necessary to deliver our services.</Trans>
                </p>

                <h2>
                    <Trans i18nKey="privacy.header7">Viewing, modifying & deleting your information</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text9">You have the right to see, adjust and delete your personal information.
                        In addition, you have the right to lodge an objection against the use and/or processing of your personal information by Scrumdapp.</Trans>
                </p>

                <h2>
                    <Trans i18nKey="privacy.header8">How we protect personal information?</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text10">We take fitting measures to protect your personal information against malicious use, theft and loss.
                        To do this we use a combination of the following measures:</Trans>
                </p>
                <ul>
                    <Trans i18nKey="privacy.text11.point1"><li>TLS: All (sub-)domains in use by Scrumdapp provide a valid, strong encrypted ssl-certificate.</li></Trans>
                    <Trans i18nKey="privacy.text11.point2"><li>Firewall: Scrumdapp is hosted behind firewalls maintained by the University of Applied Sciences Utrecht and TandemIt.</li></Trans>
                    <Trans i18nKey="privacy.text11.point3"><li>Databases: All information and backups of this information are stored on databases hosted within the Open-ICT/TandemIt cloud environment.</li></Trans>
                </ul>

                <h2>
                    <Trans i18nKey="privacy.header9">Questions & Complaints</Trans>
                </h2>
                <p>
                    <Trans i18nKey="privacy.text12">If you have questions about this privacy notice, your personal information or how Scrumdapp handles information, please reach out at:</Trans>
                    <a
                        className="text-link"
                        href="mailto:info@scrumdapp.com"
                        target="_blank"
                    >
                        {t("privacy.link1")}
                    </a>
                    <Trans i18nKey="privacy.text13">or on </Trans>
                    <a
                        className="text-link"
                        href="https://scrumdapp.com/#Contact"
                        target="_blank"
                    >
                        {t("privacy.link2")}
                    </a>
                </p>
            </div>
        </div>
    )
}