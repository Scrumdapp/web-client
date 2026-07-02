import Invites from "../../components/groups/Invites/InviteComponent.tsx";
import {BackgroundSelector} from "../../components/groups/settings/background/GroupBackgroundSelector.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {hasRole, Role} from "../../js/utils/userPermissions.ts";
import {ShowIf} from "../../components/utility/Conditional.tsx";
import {useUser} from "../../js/context/user/useUser.ts";
import UserManagement from "./UserManagement.tsx";


export function SettingsPage() {

    const group = useGroup()
    const user = useUser()

    return (
        <div className="vertical gap-4">
            <title>Settings | Scrumdapp</title>
            <div className="card">
                <h2>Settings</h2>
            </div>
            <UserManagement groupId={group.id}/>
            <ShowIf condition={hasRole(user, Role.Coach)}>
                <Invites groupId={group.id}/>
            </ShowIf>
            <ShowIf condition={hasRole(user, Role.Coach)}>
                <BackgroundSelector />
            </ShowIf>
        </div>

    )
}
