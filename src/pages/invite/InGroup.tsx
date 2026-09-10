import { useTranslation } from "react-i18next"
import { PartialGroup } from "../../js/models/group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



export function InGroup({ group }: { group: PartialGroup }) {
    const { t } = useTranslation();

    return (
        <div className="app-container">
            <div className="card">
                <h1>{t("invite.inGroup.header")}</h1>
                <p>{t("invite.inGroup.text", { group: group.name })}</p>
                <div className="flex justify-end gap-md">
                    <Link className="btn" to={`/groups/${group.id}`}>
                        <FontAwesomeIcon icon={faRotateLeft} className="text-gray" />
                        {t("invite.inGroup.toGroup")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
