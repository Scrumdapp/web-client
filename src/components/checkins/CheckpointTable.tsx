import { useTranslation } from "react-i18next";
import { SessionCheckpointRow } from "./checkpointUserMapper";
import { CheckpointRow } from "./CheckpointRow";
import { useUser } from "../../js/context/user/useUser";
import { GroupCheckpointSession } from "../../js/models/checkpoint";

export function CheckpointTable({
  session,
  locked,
  checkpoints
}: {
  session: GroupCheckpointSession;
  locked: boolean
  checkpoints: SessionCheckpointRow[]
}) {
  const { t } = useTranslation();
  const user = useUser();

  const isSessionmaster = user.id === session.ownerId;

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="p-1 md:p-2 text-left w-16 md:w-44">
            {t("checkpoint.name")}
          </th>
          <th className="p-1 md:p-2 text-left border-l border-dotted w-16 md:w-28 truncate">
            {t("checkpoint.attendance")}
          </th>
          <th className="p-2 items-center w-20 md:w-28 truncate">
            {t("checkpoint.stars")}
          </th>
          <th className="p-1 md:p-2 text-left hidden lg:table-cell md:w-28 truncate">
            {t("checkpoint.notes")}
          </th>
          <th className="p-1 md:p-2 text-left hidden lg:table-cell md:w-28 truncate">
            {t("checkpoint.obstacle")}
          </th>
          <th className="p-1 md:p-2 pl-0 text-right w-12 md:w-20 truncate">
            {t("checkpoint.actions")}
          </th>
        </tr>
      </thead>
      <tbody>
        {checkpoints.map((item) => (
          <CheckpointRow
            key={item.groupUser}
            checkpoint={item}
            canEdit={!locked && (isSessionmaster || item.groupUser == user.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
