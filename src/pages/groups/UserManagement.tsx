import { useEffect } from "react";
import { useUser } from "../../js/context/user/useUser";
import { useUserManagement } from "../../js/hooks/useUserManagement";

type Props = {
    groupId: number;
};

export default function UserManagement({ groupId }: Props) {
    const currentUser = useUser();

    const canEditRoles =
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
            <table>
                <thead>
                <tr>
                    <th className="text-left p-1"><h2>Name</h2></th>
                    <th className="text-left p-1"><h2>Role</h2></th>
                    <th className="text-right p-1"><h2>Danger Zone</h2></th>
                </tr>
                </thead>
                <tbody>
                {rows.map(user => (
                    <tr key={user.user_id}>
                        <td>
                            {user.first_name} {user.last_name}
                        </td>

                        <td>
                            {canEditRoles ? (
                                <select defaultValue={user.role}>
                                    <option>Coach</option>
                                    <option>Member</option>
                                </select>
                            ) : (
                                user.role
                            )}
                        </td>
                        <td className="p-1">
                            <button className="btn btn-red border">Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}