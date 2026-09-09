import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { UserManagementModal } from "../../components/modals/UserManagementModal.tsx";
import { useUser } from "../../js/context/user/useUser.ts";
import { ShowIf } from "../../components/utility/Conditional.tsx";
import { hasRole, Role } from "../../js/utils/userPermissions.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";

type Props = {
    groupId: number;
};

export default function UserManagement({ groupId }: Props) {
    const { t } = useTranslation();
    const user = useUser();
    const modal = useModalState();
    const getGroupUsers = useApi(ScrumdappApi.getGroupUsers());
    const { data } = getGroupUsers;
    const rows = data ?? [];
    useEffect(() => {
        void getGroupUsers.runCommand(groupId)
    }, [groupId]);

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-2">
                <h2>{t("settings.users.users")}</h2>
            </div>
            <hr className="my-2 mr-0" />
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="text-left px-2 py-1">{t("checkpoint.name")}</th>
                        <th className="text-left px-2 py-1 border-l border-dotted">{t("settings.users.role")}</th>
                    </tr>
                </thead>
                <tbody>
                {rows.map(user => (
                    <tr key={user.user_id}>
                        <td className="p-2 text-left name-field border-r border-t border-dotted border-current!">
                            {user.first_name} {user.last_name}
                        </td>
                        <td className={`p-2 text-left border-t border-dotted border-current ${user.role}`}>
                            {user.role ?? t("settings.users.roles.student")}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ShowIf condition={hasRole(user, Role.Coach)}>
                <div className="flex justify-end">
                    <button
                        className="btn btn-secondary border"
                        onClick={() => modal.open()}
                    >
                        {t("settings.users.modal.edit")}
                    </button>
                    <UserManagementModal groupId={groupId} state={modal} />
                </div>
            </ShowIf>
        </div>
    );
}