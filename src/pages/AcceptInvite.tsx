import { useParams, useSearchParams } from "react-router-dom";
import {useEffect, useState } from "react";
import {ScrumdappApi} from "../js/hooks/api/scrumdappApi.ts";
import {InviteResponse} from "../js/models/invites.tsx";
import {useUser} from "../js/context/user/useUser.ts";

export default function AcceptInvite() {
    const {inviteId} = useParams()
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
            await acceptInvite(Number(inviteId), currentUser.id,
                Number(token), password)
        } catch (e) {
            setError("Failed to join the group...")
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return(
        <div className="app-container">
            <h1>You're invited to {invite?.groupId}!</h1>
            <p>Enter your given password underneath.</p>
               <div className="w-7/10">
                    <div className="py-3">
                        <input className="write-section w-full!"
                        value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleJoinInvite}  className="btn btn-secondary border flex float-right">
                            Join
                        </button>
                    </div>
               </div>
        </div>

    )
}