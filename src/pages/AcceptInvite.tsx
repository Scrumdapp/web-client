import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import {useApi} from "../js/hooks/api/useApi.ts";
import {LoadScreen} from "../components/generic/LoadScreen.tsx";
import {ApiError} from "../js/hooks/api/apiError.ts";

export default function AcceptInvite() {
    const params = useParams()
    const inviteId = Number(params.inviteId)

    const getInvite = useApi(ScrumdappApi.GetGroupInvite())

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    if (token == null) {
        return (<InviteLoadingError msg="No token was provided" />)
    }

    useEffect(() => {
        getInvite.runCommand(inviteId, token)
    }, [getInvite.runCommand, inviteId, token])


    if (getInvite.loading) {
        return <LoadScreen />
    } else if (getInvite.error) {
        return (
            <InviteLoadingError msg={getInvite.error?.message ?? "Something went wrong retrieving invite"} />
        )
    }

    return (
        <div className="app-container">
            <div className="card vertical">
                <h1>You have received an invite</h1>
                <InviteForm inviteId={inviteId} token={token} />
            </div>
        </div>
    )
}

function InviteLoadingError({msg}: {msg : string}) {
    return (
        <div className="app-container">
            <div className="card vertical">
                <h1>Could not load invite</h1>
                <p>{msg}</p>
            </div>
        </div>
    )
}

function InviteForm({inviteId, token}: {
    inviteId: number,
    token: string
}) {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [password, setPassword] = useState("")

    const acceptInvite = useApi(ScrumdappApi.AcceptInvite())

    const handleSubmit = (event: { preventDefault: () => void })=> {
        event.preventDefault()

        if (!password.trim()) {
            return
        }

        acceptInvite.runCommand(inviteId, token ?? "", password)
            .then((data) => {

                // Logic requires api change (will change this when this is live)
                // const groupId = data.groupId
                // navigate(`/groups${groupId ? `/${groupId}` : ''}`)
                navigate(`/groups`)
            })
            .catch((error: ApiError) => {
                if (error.message.includes("password")) {
                    setErrorMessage(error.message)
                } else {
                    setErrorMessage("Something went wrong, please try again later")
                }
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
                {errorMessage && (
                    <p className="text-red-dim">{errorMessage}</p>
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