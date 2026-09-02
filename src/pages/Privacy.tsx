import { useTranslation } from "react-i18next";

export default function Privacy() {
    const { t } = useTranslation();

    return (
        <div className="app-container">
            <title>
                {t("privacy.title")}
            </title>
            <div className="card text-block">
                <h1>
                    {t("privacy.header")}
                </h1>
                <h2>
                    {t("privacy.header1")}
                </h2>
                <p>
                    {t("privacy.text1")}
                </p>
                <ul>
                    <li>{t("privacy.text2.point1")}</li>
                </ul>

                <h2>
                    {t("privacy.header2")}
                </h2>
                <p>
                    {t("privacy.text3")}
                </p>
                <ul>
                    <li>{t("privacy.text4.point1")}</li>
                    <li>{t("privacy.text4.point2")}</li>
                </ul>

                <h2>
                    {t("privacy.header3")}
                </h2>
                <p>
                    {t("privacy.text5")}
                </p>

                <h2>
                    {t("privacy.header4")}
                </h2>
                <p>
                    {t("privacy.text6")}
                </p>

                <h2>
                    {t("privacy.header5")}
                </h2>
                <p>
                    {t("privacy.text7")}
                </p>

                <h2>
                    {t("privacy.header6")}
                </h2>
                <p>
                    {t("privacy.text8")}
                </p>

                <h2>
                    {t("privacy.header7")}
                </h2>
                <p>
                    {t("privacy.text9")}
                </p>

                <h2>
                    {t("privacy.header8")}
                </h2>
                <p>
                    {t("privacy.text10")}
                </p>
                <ul>
                    <li>{t("privacy.text11.point1")}</li>
                    <li>{t("privacy.text11.point2")}</li>
                    <li>{t("privacy.text11.point3")}</li>
                </ul>

                <h2>
                    {t("privacy.header9")}
                </h2>
                <p>
                    {t("privacy.text12")}
                    <a
                        className="text-link"
                        href="mailto:info@scrumdapp.com"
                        target="_blank"
                    >
                        {t("privacy.link1")}
                    </a>
                    {t("privacy.text13")}
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