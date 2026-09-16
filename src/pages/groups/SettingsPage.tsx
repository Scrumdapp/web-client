import Invites from "../../components/groups/Invites/InviteComponent.tsx";
import { BackgroundSelector } from "../../components/groups/settings/background/GroupBackgroundSelector.tsx";
import { ShowIf } from "../../components/utility/Conditional.tsx";
import { useGroup } from "../../js/context/group/useGroup.ts";
import { useTranslation } from "react-i18next";
import { useUser } from "../../js/context/user/useUser.ts";
import { hasRole, Role } from "../../js/utils/userPermissions.ts";

export function SettingsPage() {
    const { t } = useTranslation();
    const group = useGroup();
    const user = useUser();

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
            <ShowIf condition={hasRole(user, Role.Coach)}>
                <Invites groupId={group.id} />
            </ShowIf>
            <BackgroundSelector />
        </div>

    )
}
