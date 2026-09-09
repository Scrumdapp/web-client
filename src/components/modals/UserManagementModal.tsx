import { ModalState } from "../../js/hooks/useModalState.ts";
import { useTranslation } from "react-i18next";
import { UserManagementDropDownMenu } from "../groups/settings/usermanagement/UserManagementDropdownMenu.tsx";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useUserManagement } from "../../js/hooks/useUserManagement";
import { useEffect, useState } from "react";

export function UserManagementModal({ state, groupId, onSaved }: { state: ModalState; groupId: number; onSaved: () => void }) {

    const { t } = useTranslation();
    const getGroupUsers = useApi(ScrumdappApi.getGroupUsers());

    useEffect(() => {
        void getGroupUsers.runCommand(groupId)
    }, [groupId]);

    const [roleByUserId, setRoleByUserId] = useState<Record<number, string | null>>({});

    useEffect(() => {
        setRoleByUserId(
            Object.fromEntries(rows.map(user => [user.user_id, user.role ?? null]))
        );
    }, [rows]);

    const handleRoleChange = (userId: number, newRole: string | null) => {
        setRoleByUserId(prev => ({ ...prev, [userId]: newRole }));
    };

    const handleConfirm = async () => {
        const changed = rows.filter(
            user => roleByUserId[user.user_id] !== (user.role ?? null)
        );

        if (changed.length === 0) return;

        try {
            await Promise.all(
                changed.map(user =>
                    fetch(`/api/groups/${groupId}/users/${user.user_id}/role`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ role: roleByUserId[user.user_id] }),
                    })
                )
            );
            void fetchUsers();
            void onSaved();
            state.close();
        } catch (err) {
            console.error("Failed to save roles", err);
        }
    };

    if (loading) return <p>{t("error.loading")}</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <Modal state={state}>
            <div className="space-y-5 max-w-2xl">
                <ModalHeadText>
                    {t("settings.users.modal.title")}
                </ModalHeadText>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="text-left px-2 py-1">{t("checkpoint.name")}</th>
                            <th className="text-left px-2 py-1 border-l border-dotted">{t("settings.users.role")}</th>
                            <th className="text-right pl-2 pr-0 py-1 w-40">{t("settings.users.modal.danger")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(user => (
                            <tr key={user.user_id}>
                                <td className="p-2 text-left name-field border-r border-t border-dotted border-current!">
                                    {user.first_name} {user.last_name}
                                </td>
                                <td className="p-2 text-left border-t border-dotted border-current">
                                    <UserManagementDropDownMenu
                                        value={roleByUserId[user.user_id] ?? null}
                                        onChange={(newRole) => handleRoleChange(user.user_id, newRole)}
                                    />
                                </td>
                                <td className="p-2 pr-0 border-t border-dotted border-current flex justify-end">
                                    <button className="btn btn-red border">
                                        <FontAwesomeIcon icon={faTrashCan} /> {t("settings.users.modal.remove")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalActionRow>
                    <ModalCancelButton />
                    <button
                        className="btn btn-secondary border"
                        onClick={handleConfirm}
                    >
                        <FontAwesomeIcon icon={faCheck} /> {t("settings.users.modal.confirm")}
                    </button>
                </ModalActionRow>
            </div>
        </Modal>
    );
}