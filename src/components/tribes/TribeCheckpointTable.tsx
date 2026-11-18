import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Group } from "../../js/models/group";
import { getAverageStarsColor } from "../../js/utils/colorUtils";
import { Tribe, TribeGroupCheckpoint } from "../../js/models/tribe";
import { cn } from "../../js/utils/tw";
import { getTribeCheckpointStatus } from "../../js/utils/tribeUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AttendanceCircleBar } from "../generic/AttendanceComponents";

const TribeCheckpointTableRow = memo(
  ({
    group,
    groupSession,
  }: {
    group: Group;
    groupSession: TribeGroupCheckpoint;
  }) => {
    const { t } = useTranslation();

    const checkpointSession = groupSession.session;
    const {
      icon: statusIcon,
      labelKey: statusLabelKey,
      color: statusColor,
    } = getTribeCheckpointStatus(groupSession.status);

    return (
      <tr key={groupSession.group_id} className="align-center h-15">
        <td className="p-2 text-left name-field border-r border-t border-dotted border-bg4">
          {group.name}
        </td>
        <td className="text-left p-2 border-t border-dotted border-bg4 hidden sm:table-cell">
          <div className={statusColor}>
            {statusIcon && (
              <FontAwesomeIcon icon={statusIcon} className="mr-1.5" />
            )}
            {t(statusLabelKey)}
          </div>
        </td>
        <td className="p-2 border-t border-dotted border-bg4">
          {checkpointSession && (
            <AttendanceCircleBar
              groupName={group.name}
              presences={checkpointSession.presences}
            />
          )}
        </td>
        <td className="p-2 break-words border-t border-dotted border-bg4 hidden sm:table-cell">
          {checkpointSession && checkpointSession.average_stars ? (
            <div
              className={cn(
                "flex items-center gap-1",
                getAverageStarsColor(checkpointSession.average_stars),
              )}
            >
              <FontAwesomeIcon icon={faStar} fontSize={12} />{" "}
              {checkpointSession.average_stars}
            </div>
          ) : (
            <div className="text-gray">---</div>
          )}
        </td>
        <td className="border-t border-dotted border-bg4 py-2 horizontal gap-1 md:gap-2">
          <Link
            to={`/groups/${group.id}`}
            target="_blank"
            className="btn p-1 md:p-2 border aspect-square ml-auto mr-0 mt-0"
          >
            <FontAwesomeIcon icon={faExternalLink} className="icon text-blue" />
          </Link>
        </td>
      </tr>
    );
  },
);

const TribeCheckpointTable = ({
  tribe,
  groupSessions,
}: {
  tribe: Tribe;
  groupSessions: TribeGroupCheckpoint[];
}) => {
  const { t } = useTranslation();
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr className="h-12">
          <th className="p-1 md:p-2 text-left w-16 md:w-44">
            {t("checkpoint.tribe.name")}
          </th>
          <th className="p-1 md:p-2 text-left border-l hidden sm:table-cell border-dotted w-20 md:w-28 truncate">
            {t("checkpoint.tribe.status")}
          </th>
          <th className="p-2 text-left w-20 md:w-28 truncate">
            {t("checkpoint.tribe.presence")}
          </th>
          <th className="p-1 md:p-2 text-left hidden sm:table-cell w-16 md:w-28 truncate">
            {t("checkpoint.tribe.average")}
          </th>
          <th className="p-1 md:p-2 pl-0 text-right w-12 md:w-20 truncate">
            {t("checkpoint.actions")}
          </th>
        </tr>
      </thead>
      <tbody>
        {groupSessions.map((session) => {
          const group = tribe.groups.find((g) => g.id === session.group_id);
          return group ? (
            <TribeCheckpointTableRow
              key={session.group_id}
              group={group}
              groupSession={session}
            />
          ) : null;
        })}
      </tbody>
    </table>
  );
};

export default TribeCheckpointTable;
