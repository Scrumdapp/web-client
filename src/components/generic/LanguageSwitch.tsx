import { useTranslation, Trans } from 'react-i18next';

const lngs = {
    en: { nativeName: 'EN' },
    nl: { nativeName: 'NL' }
};
function LanguageSwitch() {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button key={lng} className="hover:cursor-pointer button" style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
        </>
    )
}

export default LanguageSwitch