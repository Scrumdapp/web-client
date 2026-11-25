import { useTranslation } from "react-i18next";
import { UsersTableUserRow } from "./UsersTableUserRow";
import { useGroupUsers } from "../../../../utility/groupUsers/useGroupUsers";

export function UsersTable() {
  const { t } = useTranslation();
  const groupUsers = useGroupUsers()

  return (
    <div className="card">
      <h3>{t("settings.users.title")}</h3>
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
          {groupUsers.map((it) => (
            <UsersTableUserRow
              key={it.user_id}
              groupUser={it}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
