import { useEffect } from "react";
import { useUser } from "../../js/context/user/useUser";
import { useUserManagement } from "../../js/hooks/useUserManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
    groupId: number;
};

export default function UserManagement({ groupId }: Props) {
    const currentUser = useUser();

    const canEditRoles =
        currentUser.roles.includes("Coach");

    const canRemoveUsers =
        currentUser.roles.includes("Coach");

    const { rows, loading, error, fetch } =
        useUserManagement(groupId);

    useEffect(() => {
        void fetch();
    }, [fetch]);

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
                    <th className="text-right px-2 py-1 w-40">Danger Zone</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(user => (
                    <tr key={user.user_id}>
                        <td className="p-2 text-left name-field border-r border-t border-dotted border-current!">
                            {user.first_name} {user.last_name}
                        </td>

                        <td className="p-2 text-left border-t border-dotted border-current">
                            Role shows here
                        </td>
                        <td className="p-2 border-t border-dotted border-current">
                            <button className="btn btn-red border"><FontAwesomeIcon icon={faTrashCan} /> Remove user</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="btn btn-secondary border mt-2"><FontAwesomeIcon icon={faCheck} />Confirm</button>
        </div>
    )
}