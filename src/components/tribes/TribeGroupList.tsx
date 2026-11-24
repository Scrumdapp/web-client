import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Group } from "../../js/models/group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faChevronDown,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TribeGroupListRow = memo(({ group }: { group: Group }) => {
  const { t } = useTranslation();

  return (
    <tr className="align-center h-15">
      <td className="p-2 text-left name-field border-r border-t border-dotted border-bg4">
        {group.name}
      </td>
      <td className="text-left p-2 border-t border-dotted border-bg4 hidden sm:table-cell">
        {t("tribes.groups.list.memberCount", {
          count: group.member_count,
        })}
      </td>
      <td className="border-t border-dotted border-bg4 py-2 horizontal gap-1 md:gap-2">
        <button className="btn gap-2 p-1 md:p-2 border ml-auto mr-0 mt-0">
          <FontAwesomeIcon
            icon={faUsers}
            className="icon text-purple text-xs"
          />

          {t("tribes.groups.list.manage")}
          <FontAwesomeIcon icon={faChevronDown} className="icon text-xs" />
        </button>
        <Link
          to={`/groups/${group.id}`}
          target="_blank"
          className="btn p-1 md:p-2 border aspect-square "
        >
          <FontAwesomeIcon icon={faExternalLink} className="icon text-blue" />
        </Link>
      </td>
    </tr>
  );
});

const TribeGroupList = ({ groups }: { groups: Group[] }) => {
  const { t } = useTranslation();
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr className="h-12">
          <th className="p-1 md:p-2 text-left w-16 md:w-44">
            {t("tribes.groups.list.group")}
          </th>
          <th className="p-1 md:p-2 text-left border-l hidden sm:table-cell border-dotted w-20 md:w-28 truncate">
            {t("tribes.groups.list.members")}
          </th>
          <th className="p-2 text-right w-20 md:w-28 truncate">
            {t("tribes.groups.list.actions")}
          </th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => {
          return group ? (
            <TribeGroupListRow key={group.id} group={group} />
          ) : null;
        })}
      </tbody>
    </table>
  );
};

export default TribeGroupList;
