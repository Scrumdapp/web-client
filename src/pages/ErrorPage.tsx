import { useNavigate } from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";

export default function ErrorPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="app-container vertical gap-4">
            <title>
                <Trans i18nKey="error.title">Page not found | Scrumdapp</Trans>
            </title>
            <img src="https://http.cat/images/404.jpg" alt={t('error.notfound')} className="border rounded-2xl mx-auto" />
            <a
                href=".." className="mx-auto bg-bg! card btn text-xl"
                onClick={(e) => {e.preventDefault();navigate(-1);}}
            >
                <Trans i18nKey="error.goback">Go Back</Trans>
            </a>
        </div>
    )
}