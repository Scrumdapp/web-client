import { useTranslation } from 'react-i18next';

const lngs = {
    en: { nativeName: 'English', flag: '🇬🇧' },
    nl: { nativeName: 'Nederlands', flag: '🇳🇱' }
} satisfies Record<string, { nativeName: string; flag: string }>;

type LngKey = keyof typeof lngs;

function LanguageSwitch() {
    const { i18n } = useTranslation();

    return (
        <div className="flex horizontal gap-4 justify-center items-center mb-2">
            {(Object.keys(lngs) as LngKey[]).map((lng) => (
                <button
                    key={lng}
                    className="hover:cursor-pointer"
                    style={{ opacity: i18n.resolvedLanguage === lng ? 1 : 0.5 }}
                    type="button"
                    aria-label={lngs[lng].nativeName}
                    title={lngs[lng].nativeName}
                    onClick={() => i18n.changeLanguage(lng)}
                >
                    {lngs[lng].flag}
                </button>
            ))}
        </div>
    );
}

export default LanguageSwitch;