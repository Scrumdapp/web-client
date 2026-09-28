import { useGroup } from "../../../../js/context/group/useGroup";
import { ScrumdappApi } from "../../../../js/hooks/api/scrumdappApi";
import { useApiComponent } from "../../../../js/hooks/api/useApiComponent";
import { UsersTableUserRow } from "./UsersTableUserRow";

export function UsersTable() {
  const group = useGroup();
  const GetGroupUsersComponent = useApiComponent(ScrumdappApi.getGroupUsers());

  return (
    <div className="card">
      <h3>Users</h3>
      <GetGroupUsersComponent input={[group.id]}>
        {(users) => (
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Visibility</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((it) => (
                <UsersTableUserRow key={it.user_id} user={it} />
              ))}
            </tbody>
          </table>
        )}
      </GetGroupUsersComponent>
    </div>
  );
}
