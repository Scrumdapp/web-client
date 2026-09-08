import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { useTranslation } from "react-i18next";
import { useApi } from "../js/hooks/api/useApi.ts";
import { LoadScreen } from "../components/generic/LoadScreen.tsx";
import { ErrorScreen } from "../components/generic/ErrorScreen.tsx";
import { useState } from "react";

export default function AcceptInvite() {
    const { t } = useTranslation();
    const { inviteId: unparsedInviteId } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("");

    const token = searchParams.get("token") ?? ""
    const inviteId = parseInt(unparsedInviteId!)

    const getGroupInvite = useApi(ScrumdappApi.GetGroupInvite(), {
        fetchOnCreated: [inviteId, token]
    })

    const acceptInviteRequest = useApi(ScrumdappApi.AcceptInvite())

    const handleAcceptInvite = () => {
        acceptInviteRequest.runCommand(inviteId, token, password)
            .then(() => navigate(`/groups/${getGroupInvite.data?.groupId}`))
            .catch((e) => console.error(e))
    }

    if (getGroupInvite.loading || acceptInviteRequest.loading) {
        return (
            <div className="app-container">
                <LoadScreen />
            </div>
        )
    }

    if (getGroupInvite.error) {
        return (
            <div className="app-container">
                <ErrorScreen error={getGroupInvite.error} />
            </div>
        )
    }

    const invite = getGroupInvite.data!

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
                        <button onClick={handleAcceptInvite} className="btn btn-secondary border flex float-right">
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
