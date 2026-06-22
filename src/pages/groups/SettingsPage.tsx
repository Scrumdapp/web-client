import Invites from "../../components/groups/Invites/InviteComponent.tsx";
import {BackgroundSelector} from "../../components/groups/settings/background/GroupBackgroundSelector.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";

export function SettingsPage() {

    const group = useGroup()

    return (
        <div className="vertical gap-4">
            <div className="card">
                <h2>Settings</h2>
            </div>
            <Invites groupId={group.id}/>
            <BackgroundSelector />
        </div>

    )
}
