import { useParams, useSearchParams } from "react-router-dom"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi"
import { LoadScreen } from "../../components/generic/LoadScreen"
import { ErrorScreen } from "../../components/generic/ErrorScreen"
import { useApi } from "../../js/hooks/api/useApi"
import { InGroup } from "./InGroup"
import AcceptInvite from "./AcceptInvite"


export function InviteRouter() {

    const [searchParams] = useSearchParams()
    const { inviteId: unparsedInviteId } = useParams()

    const token = searchParams.get("token") ?? ""
    const inviteId = parseInt(unparsedInviteId!)

    const getGroupInvite = useApi(ScrumdappApi.GetGroupInvite(), { fetchOnCreated: [inviteId, token] })
    const getUserGroups = useApi(ScrumdappApi.getGroups(), { fetchOnCreated: [] })

    if (getGroupInvite.loading || getUserGroups.loading) {
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

    if (getUserGroups.error) {
        return (
            <div className="app-container">
                <ErrorScreen error={getUserGroups.error} />
            </div>
        )
    }

    const group = getUserGroups.data!.find(it => it.id == getGroupInvite.data?.groupId)
    if (group) {
        return (
            <InGroup group={group} />
        )
    }

    return (
        <AcceptInvite invite={getGroupInvite.data!} />
    )
}
