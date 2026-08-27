import Invites from "../../components/groups/Invites/InviteComponent.tsx";
import {BackgroundSelector} from "../../components/groups/settings/background/GroupBackgroundSelector.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {Trans} from "react-i18next";

export function SettingsPage() {

    const group = useGroup()

    return (
        <div className="vertical gap-4">
            <title>
                <Trans i18nKey="settings.title">Settings | Scrumdapp</Trans>
            </title>
            <div className="card">
                <h2>
                    <Trans i18nKey="settings.header">Settings</Trans>
                </h2>
            </div>
            <Invites groupId={group.id}/>
            <BackgroundSelector />
        </div>

    )
}
