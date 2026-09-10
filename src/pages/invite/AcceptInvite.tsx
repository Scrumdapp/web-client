import { useNavigate } from "react-router-dom";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { useTranslation } from "react-i18next";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useState } from "react";
import { InviteResponse } from "../../js/models/invites.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function AcceptInvite({ invite }: { invite: InviteResponse }) {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [password, setPassword] = useState("");

    const acceptInviteRequest = useApi(ScrumdappApi.AcceptInvite())

    const handleAcceptInvite = () => {
        acceptInviteRequest.runCommand(invite.id, invite.token, password)
            .then(() => navigate(`/groups/${invite.groupId}`))
            .catch((e) => console.error(e))
    }

    if (acceptInviteRequest.loading) {
        return (
            <div className="app-container">
                <LoadScreen />
            </div>
        )
    }

    return (
        <div className="app-container">
            <title>
                {t("invite.title")}
            </title>
            <div className="card flex flex-col">
                <h1>
                    {t("invite.accept.header")} {invite.groupId}!
                </h1>
                <p>
                    {t("invite.accept.text")}
                </p>
                <div>
                    <div className="py-3">
                        <input
                            className="write-section w-full!"
                            placeholder={t('invite.password')}
                            alt={t('invite.password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleAcceptInvite} className="btn border flex float-right">
                            <FontAwesomeIcon icon={faUserPlus} className="text-blue" />
                            {t("invite.accept.join")}
                        </button>
                        {acceptInviteRequest.error != null && (
                            <p className="text-error">
                                {acceptInviteRequest.error.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
