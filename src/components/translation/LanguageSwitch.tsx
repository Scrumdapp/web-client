import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English", flag: "🇬🇧" },
  nl: { nativeName: "Nederlands", flag: "🇳🇱" },
} satisfies Record<string, { nativeName: string; flag: string }>;

type LngKey = keyof typeof lngs;

function LanguageSwitch() {
  const { i18n, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("header.language")}
      className="flex horizontal gap-4 justify-center items-center mb-2"
    >
      {(Object.keys(lngs) as LngKey[]).map((lng) => {
        const isActive = i18n.resolvedLanguage === lng;
        return (
          <button
            key={lng}
            lang={lng}
            aria-pressed={isActive}
            className={`hover:cursor-pointer min-w-6 min-h-6 px-1 rounded border-b-2 ${
              isActive ? "border-fg" : "border-transparent"
            }`}
            style={{ opacity: isActive ? 1 : 0.6 }}
            type="button"
            aria-label={lngs[lng].nativeName}
            title={lngs[lng].nativeName}
            onClick={() => i18n.changeLanguage(lng)}
          >
            <span aria-hidden="true">{lngs[lng].flag}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
