import { useModalState } from "../js/hooks/useModalState.ts";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { GroupCard } from "../components/groups/GroupCard.tsx";
import { useApiComponent } from "../js/hooks/api/useApiComponent.tsx";
import { Link } from "react-router-dom";
import { IconInput } from "../components/generic/IconInput.tsx";
import { CreateGroupModal } from "../components/modals/CreateGroupModal.tsx";
import { useUser } from "../js/context/user/useUser.ts";
import { ShowIf } from "../components/utility/Conditional.tsx";
import { hasRole, Role } from "../js/utils/userPermissions.ts";
import { useTranslation } from "react-i18next";

export default function Groups() {
  const { t } = useTranslation();

  const user = useUser();
  const modal = useModalState();
  const [search, setSearch] = useState("");
  const GetGroupsComponent = useApiComponent(ScrumdappApi.getGroups());

  useEffect(() => {
    modal.onAccepted(() => {
      console.log("closed");
      GetGroupsComponent.refresh();
    });
    modal.onClosed(() => {
      console.log("closed");
      GetGroupsComponent.refresh();
    });
  }, []);

  return (
    <div className="app-container vertical gap-4 pt-0! md:pt-4">
      <title>{t("groups.title")}</title>
      <div className="vertical md:horizontal justify-between">
        <h1 className="hidden md:flex-1">Scrumdapp</h1>
        <div className="flex-1 horizontal center align-top max-w-full text-xs md:text-base">
          <IconInput
            icon={faMagnifyingGlass}
            type="text"
            placeholder={t("groups.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            alt={t("groups.searchAlt")}
            className="bg-bg_h"
          />
        </div>
        <div className="flex-1">
          <ShowIf condition={hasRole(user, Role.Coach)}>
            <button
              className="ml-auto btn btn-red border max-h-fit mt-2 md:mt-0 text-xs md:text-base"
              onClick={modal.open}
            >
              {t("groups.newgroup")}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </ShowIf>
        </div>
      </div>
      <GetGroupsComponent input={[]}>
        {(groups) => {
          const filteredGroups = groups.filter((group) =>
            group.name.toLowerCase().includes(search.toLowerCase().trim()),
          );
          return (
            <ul className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 justify-center">
              {filteredGroups.length === 0 && t("groups.nogroups")}
              {filteredGroups.map((group) => (
                <li key={group.id}>
                  <Link to={`/groups/${group.id}`} className="block">
                    <GroupCard group={group} />
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </GetGroupsComponent>
      <ShowIf condition={hasRole(user, Role.Coach)}>
        <CreateGroupModal state={modal} />
      </ShowIf>
    </div>
  );
}
