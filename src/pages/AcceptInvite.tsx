import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { InviteResponse } from "../js/models/invites.tsx";
import { useUser } from "../js/context/user/useUser.ts";
import { useTranslation } from "react-i18next";

export default function AcceptInvite() {
    const { t } = useTranslation();
    const { inviteId } = useParams()
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const currentUser = useUser()

    const [invite, setInvite] = useState<InviteResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")

    const getInvite = ScrumdappApi.GetGroupInvite()
    const acceptInvite = ScrumdappApi.AcceptInvite()

    useEffect(() => {
        async function RetrieveInvite() {
            try {
                const result = await getInvite(Number(inviteId), token!)
                setInvite(result)
            } catch (e) {
                setError("The invite seems invalid or has expired...")
            } finally {
                setLoading(false)
            }
        }
        RetrieveInvite()
    }, [inviteId])

    async function handleJoinInvite() {
        try {
            await acceptInvite(Number(inviteId), currentUser.id, token ?? "", password)
        } catch (e) {
            setError("Failed to join the group...")
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="app-container">
            <title>
                {t("invite.title")}
            </title>
            <div className="card flex flex-col">
                <h1>
                    {t("invite.accept.header")} {invite?.groupId}!
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
                        <button onClick={handleJoinInvite} className="btn btn-secondary border flex float-right">
                            {t("invite.accept.join")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
