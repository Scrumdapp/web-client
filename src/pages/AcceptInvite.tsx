import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { InviteResponse } from "../js/models/invites.ts";
import { useUser } from "../js/context/user/useUser.ts";
import {useApi} from "../js/hooks/api/useApi.ts";

export default function AcceptInvite() {
    const { inviteId } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")

    const currentUser = useUser()

    const [invite, setInvite] = useState<InviteResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")

    const getInvite = ScrumdappApi.GetGroupInvite()
    const acceptInvite = useApi(ScrumdappApi.AcceptInvite())


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

     function handleJoinInvite() {
         acceptInvite.runCommand(Number(inviteId), currentUser.id, token ?? "", password).then(() => {
             if (acceptInvite.error != null) {
                 switch (acceptInvite.error.status) {
                     case 401:
                         setError(acceptInvite.error.message)
                         break;
                     default:
                         setError("Could not accept invite.")
                         break;
                 }
             } else {
                 const groupId = acceptInvite.data?.groupId
                 navigate(`/groups${groupId ? `/${groupId}` : ''}`)
             }
         })
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="app-container">
            <div className="card flex flex-col">
                <h1>You're invited to {invite?.groupId}!</h1>
                <p>Enter your given password underneath.</p>
                <div>
                    <div className="py-3">
                        <input className="write-section w-full!"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleJoinInvite} className="btn btn-secondary border flex float-right">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
