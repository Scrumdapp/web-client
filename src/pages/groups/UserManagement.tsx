import { useEffect, useState } from "react";
import { useUser } from "../../js/context/user/useUser";
import { useUserManagement } from "../../js/hooks/useUserManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UserManagementDropDownMenu } from "../../components/groups/settings/usermanagement/UserManagementDropdownMenu.tsx";

type Props = {
    groupId: number;
};

export default function UserManagement({ groupId }: Props) {

    const currentUser = useUser();

    const canEditRoles = currentUser.roles.includes("Coach");
    const canRemoveUsers = currentUser.roles.includes("Coach");

    const { rows, loading, error, fetch } = useUserManagement(groupId);

    useEffect(() => {
        void fetch();
    }, [fetch]);

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
                changed.map(user => updateUserRole(groupId, user.user_id, roleByUserId[user.user_id])
                    fetch(`/api/groups/${groupId}/users/${user.user_id}/role`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ role: roleByUserId[user.user_id] }),
                    })
                )
            );
            void fetch();
        } catch (err) {
            console.error("Failed to save roles", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="card">
            <h2 className="mb-2">Users</h2>
            <hr className="my-2 mr-0" />
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="text-left px-2 py-1">Name</th>
                        <th className="text-left px-2 py-1 border-l border-dotted">Role</th>
                        <th className="text-right pl-2 pr-0 py-1 w-40">Danger Zone</th>
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
                                    <FontAwesomeIcon icon={faTrashCan} /> Remove user
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end">
                <button
                    className="btn btn-secondary border mt-2"
                    onClick={handleConfirm}
                >
                    <FontAwesomeIcon icon={faCheck} /> Confirm
                </button>
            </div>
        </div>
    )
}