import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Group } from "../../js/models/group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faChevronDown,
  faArrowRightArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { TribeUser } from "../../js/models/tribe";
import { useApi } from "../../js/hooks/api/useApi";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi";
import { LoadScreen } from "../generic/LoadScreen";
import { ErrorScreen } from "../generic/ErrorScreen";
import { Collapse } from "../generic/Collapse";
import { cn } from "../../js/utils/tw";
import IconButton from "../generic/buttons/IconButton";
import ActionButton from "../generic/buttons/ActionButton";

const TribeGroupListRow = memo(
  ({
    group,
    groupUsers,
    deleteUser,
    moveUser,
    addUsers,
  }: {
    group: Group;
    groupUsers: TribeUser[];
    deleteUser: () => void;
    moveUser: () => void;
    addUsers: () => void;
  }) => {
    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <>
        <tr
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            "align-center h-15 hover:bg-bg cursor-pointer transition-colors duration-300 ",
            isExpanded && "bg-bg",
          )}
        >
          <td className="p-2 border-r border-t border-t-dotted border-bg4">
            <Link
              to={`/groups/${group.id}`}
              target="_blank"
              className="w-fit flex gap-2 items-center border-b border-b-transparent border-dotted hover:border-b-fg2 transition-colors duration-100"
            >
              {group.name}
              <FontAwesomeIcon
                icon={faExternalLink}
                className="icon text-blue text-xs"
              />
            </Link>
          </td>
          <td className=" p-2 border-t border-dotted border-bg4">
            <div className="py-auto h-full flex items-center justify-between">
              {t("tribes.groups.list.userCount", {
                count: group.user_count,
              })}

              <FontAwesomeIcon
                icon={faChevronDown}
                className={cn(
                  "icon transition-all",
                  isExpanded ? "rotate-180" : "",
                )}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="p-0">
            <Collapse open={isExpanded}>
              <div className="bg-bg pt-2 p-4 mb-4 rounded-b-md border-l-2 border-l-bg3">
                <div className="flex items-center justify-between py-2">
                  <h3>{group.name}</h3>
                  <ActionButton
                    labelTranslationKey="tribes.groups.list.add"
                    icon={faPlus}
                    onClick={addUsers}
                  />
                </div>
                <ul>
                  {groupUsers.map((user, idx) => (
                    <li
                      key={user.user_id}
                      className={cn(
                        "flex items-center justify-between py-2",
                        idx + 1 === groupUsers?.length
                          ? ""
                          : "border-b border-b-fg4",
                      )}
                    >
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                      <div className="flex items-center gap-2">
                        <IconButton
                          icon={faArrowRightArrowLeft}
                          onClick={moveUser}
                          iconClassName="text-yellow"
                        />
                        <IconButton
                          icon={faTrashCan}
                          onClick={deleteUser}
                          iconClassName="text-red"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </td>
        </tr>
      </>
    );
  },
);

const TribeGroupList = ({
  tribeId,
  groups,
}: {
  tribeId: number;
  groups: Group[];
}) => {
  const { t } = useTranslation();

  const getTribeUsersByGroup = useApi(ScrumdappApi.getTribeUsers(), {
    fetchOnCreated: [tribeId],
  });

  const deleteUser = () => {
    return true;
  };

  const moveUser = () => {
    return true;
  };

  const addUsers = () => {
    return true;
  };

  const tribeUsersByGroup = getTribeUsersByGroup.data ?? [];

  if (getTribeUsersByGroup.error)
    return <ErrorScreen error={getTribeUsersByGroup.error} />;

  if (getTribeUsersByGroup.loading || getTribeUsersByGroup.data == null)
    return <LoadScreen />;

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr className="h-12">
          <th className="w-2/3 sm:w-1/3 p-1 md:p-2 text-left">
            {t("tribes.groups.list.group")}
          </th>
          <th className="w-1/3 sm:w-2/3 p-1 md:p-2 text-left border-l border-dotted truncate">
            {t("tribes.groups.list.users")}
          </th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => {
          const groupUsers =
            tribeUsersByGroup.find((it) => it.group_id === group.id)?.users ??
            [];
          return group ? (
            <TribeGroupListRow
              key={group.id}
              group={group}
              groupUsers={groupUsers}
              moveUser={moveUser}
              deleteUser={deleteUser}
              addUsers={addUsers}
            />
          ) : null;
        })}
      </tbody>
    </table>
  );
};

export default TribeGroupList;
