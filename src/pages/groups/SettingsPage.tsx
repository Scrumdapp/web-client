import Invites from "../../components/groups/Invites/InviteComponent.tsx";
import {useParams} from "react-router-dom";
import {BackgroundSelector} from "../../components/groups/settings/background/GroupBackgroundSelector.tsx";

export function SettingsPage() {

    const { groupId } = useParams()

    return (
        <div className="vertical gap-4">
            <div className="card">
                <h2>Settings</h2>
            </div>
            <Invites groupId={Number(groupId)}/>
            <BackgroundSelector />
        </div>

    )
}
