import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="app-container vertical gap-4">
      <title>{t("errors.generic.notFound.title")}</title>
      <img
        src="https://http.cat/images/404.jpg"
        alt={t("errors.generic.notFound.description")}
        className="border rounded-2xl mx-auto"
      />
      <a
        href=".."
        className="mx-auto bg-bg! card btn text-xl"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        {t("errors.generic.notFound.goback")}
      </a>
    </div>
  );
}
