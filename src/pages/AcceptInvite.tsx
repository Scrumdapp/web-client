import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import {useApi} from "../js/hooks/api/useApi.ts";
import {LoadScreen} from "../components/generic/LoadScreen.tsx";

export default function AcceptInvite() {
    const params = useParams()
    const inviteId = Number(params.inviteId)

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const navigate = useNavigate()

    const [password, setPassword] = useState("")

    const getInvite = useApi(ScrumdappApi.GetGroupInvite())
    const acceptInvite = useApi(ScrumdappApi.AcceptInvite())


    useEffect(() => {
        getInvite.runCommand(inviteId, token ?? "")
    }, [getInvite.runCommand])

    function handleJoinInvite() {
        acceptInvite.runCommand(inviteId, token ?? "", password)
            .then((data) => {
                const groupId = data.groupId
                navigate(`/groups${groupId ? `/${groupId}` : ''}`)
            })
    }

    if (getInvite.loading) return <LoadScreen />
    if (getInvite.error) {
        return <p>{getInvite.error?.message ?? "Something went wrong retrieving invite"}</p>
    }

    if (acceptInvite.error) {
        return <p>{acceptInvite.error?.message ?? "Could not accept invite"}</p>
    }

    return (
        <div className="app-container">
            <div className="card flex flex-col">
                <h1>You're invited to {}!</h1>
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
