import Invites from "../../components/groups/Invites/InviteComponent.tsx";
import {BackgroundSelector} from "../../components/groups/settings/background/GroupBackgroundSelector.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";
import { useTranslation } from "react-i18next";

export function SettingsPage() {
    const {t} = useTranslation();
    const group = useGroup()

    return (
        <div className="vertical gap-4">
            <title>
                {t("settings.title")}
            </title>
            <div className="card">
                <h2>
                    {t("settings.header")}
                </h2>
            </div>
            <Invites groupId={group.id}/>
            <BackgroundSelector />
        </div>

    )
}
