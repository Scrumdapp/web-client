import { useTranslation } from "react-i18next";
import { useGroup } from "../../../../js/context/group/useGroup";
import { ScrumdappApi } from "../../../../js/hooks/api/scrumdappApi";
import { useApiComponent } from "../../../../js/hooks/api/useApiComponent";
import { UsersTableUserRow } from "./UsersTableUserRow";

export function UsersTable() {
  const { t } = useTranslation();
  const group = useGroup();
  const GetGroupUsersComponent = useApiComponent(ScrumdappApi.getGroupUsers());

  return (
    <div className="card">
      <h3>{t("settings.users.title")}</h3>
      <GetGroupUsersComponent input={[group.id]}>
        {(users) => (
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="text-left p-2">{t("settings.users.name")}</th>
                <th className="text-left p-2">
                  {t("settings.users.ghost.labelTable")}
                </th>
                <th className="text-right p-2">
                  {t("settings.users.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((it) => (
                <UsersTableUserRow
                  key={it.user_id}
                  user={it}
                  onUpdated={() => GetGroupUsersComponent.refresh()}
                />
              ))}
            </tbody>
          </table>
        )}
      </GetGroupUsersComponent>
    </div>
  );
}
