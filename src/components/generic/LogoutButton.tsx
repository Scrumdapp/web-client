import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { WebConfig } from "../../config";
import { useTranslation } from "react-i18next";

export const handleLogout = () => {
    if (import.meta.env.DEV) {
        fetch(WebConfig.logoutUrl).then(() => location.href = "/")
    } else {
        location.href = WebConfig.logoutUrl
    }
}

export function LogoutButton() {
    const {t} = useTranslation();
    return (
        <button className="btn-nav-dropdown hover:text-red cursor-pointer" type="button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="text-red " />
            {t("header.logout")}
        </button>
    )
}
