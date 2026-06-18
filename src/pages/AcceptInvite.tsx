import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import {useApi} from "../js/hooks/api/useApi.ts";
import {LoadScreen} from "../components/generic/LoadScreen.tsx";
import useTempValue from "../js/hooks/useTempValue.ts";

export default function AcceptInvite() {
    const params = useParams()
    const inviteId = Number(params.inviteId)

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const getInvite = useApi(ScrumdappApi.GetGroupInvite())

    useEffect(() => {
        getInvite.runCommand(inviteId, token ?? "")
    }, [getInvite.runCommand, inviteId, token])

    if (token == null) {
        return <p>Expected a token</p>
    }
    if (getInvite.loading) {
        return <LoadScreen />
    } else if (getInvite.error) {
        return (
            <div className="app-container">
                <div className="card flex flex-col">
                    <p>{getInvite.error?.message ?? "Something went wrong retrieving invite"}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="app-container">
            <div className="card flex flex-col">
                <h1>You have received an invite</h1>
                <InviteForm inviteId={inviteId} token={token} />
            </div>
        </div>
    )
}

function InviteForm({inviteId, token}: {
    inviteId: number,
    token: string
}) {

    const navigate = useNavigate()
    const errorMessage = useTempValue<string>()
    const [password, setPassword] = useState("")

    const acceptInvite = useApi(ScrumdappApi.AcceptInvite())

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()

        if (!password.trim()) {
            return
        }

        acceptInvite.runCommand(inviteId, token ?? "", password)
            .then((data) => {
                const groupId = data.groupId
                navigate(`/groups${groupId ? `/${groupId}` : ''}`)
            })
            .catch((error) => {
                //TODO (filter errors)
                errorMessage.showContent("Something went wrong, please try again later", 40000)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Password
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    className="write-section w-full!"
                />
            </label>
            <div className="flex items-center w-full my-3">
                {errorMessage.visibility && (
                    <p className="text-red-dim">{errorMessage.content}</p>
                )}
                <button
                    type="submit"
                    className="btn btn-secondary ml-auto border">
                    Submit
                </button>
            </div>
        </form>
    )
}