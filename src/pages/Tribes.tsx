import { useModalState } from "../js/hooks/useModalState.ts";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { useApiComponent } from "../js/hooks/api/useApiComponent.tsx";
import { Link } from "react-router-dom";
import { IconInput } from "../components/generic/IconInput.tsx";
import { useUser } from "../js/context/user/useUser.ts";
import { ShowIf } from "../components/utility/Conditional.tsx";
import { hasRole, Role } from "../js/utils/userPermissions.ts";
import { useTranslation } from "react-i18next";
import { CreateTribeModal } from "../components/modals/CreateTribeModal.tsx";
import { TribeCard } from "../components/groups/TribeCard.tsx";
import ErrorPage from "./ErrorPage.tsx";

const Tribes = () => {
  const { t } = useTranslation();

  const user = useUser();
  const modal = useModalState();
  const [search, setSearch] = useState("");

  const GetTribesComponent = useApiComponent(ScrumdappApi.getTribes());

  useEffect(() => {
    modal.onAccepted(() => {
      console.log("closed");
      GetTribesComponent.refresh();
    });
    modal.onClosed(() => {
      console.log("closed");
      GetTribesComponent.refresh();
    });
  }, []);

  if (!hasRole(user, Role.Coach)) return <ErrorPage />;

  return (
    <div className="app-container vertical gap-4 px-2! md:px-4 pt-0! md:pt-4">
      <title>{t("tribes.title")}</title>
      <div className="flex flex-wrap justify-between gap-2 md:grid md:grid-cols-3">
        <div className="basis-full">
          <h1>{t("tribes.pageTitle")}</h1>
        </div>

        <div className="flex-1 md:col-start-2">
          <div className="flex justify-start md:justify-center align-top w-fit md:w-full">
            <IconInput
              icon={faMagnifyingGlass}
              type="text"
              placeholder={t("tribes.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              alt={t("tribes.searchAlt")}
              className="bg-bg_h truncate w-full"
            />
          </div>
        </div>
        <div className="md:col-start-3 md:justify-self-end">
          <ShowIf condition={hasRole(user, Role.Coach)}>
            <button
              className="btn btn-red border max-h-fit"
              onClick={modal.open}
            >
              {t("tribes.newtribe")}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </ShowIf>
        </div>
      </div>
      <GetTribesComponent input={[]}>
        {(tribes) => {
          const filteredGroups = tribes.filter((tribe) =>
            tribe.name.toLowerCase().includes(search.toLowerCase().trim()),
          );
          return (
            <ul className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 justify-center">
              {filteredGroups.length === 0 && t("tribes.notribes")}
              {filteredGroups.map((tribe) => (
                <li key={tribe.id}>
                  <Link to={`/tribes/${tribe.id}`} className="block">
                    <TribeCard tribe={tribe} />
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </GetTribesComponent>

      <ShowIf condition={hasRole(user, Role.Coach)}>
        <CreateTribeModal state={modal} />
      </ShowIf>
    </div>
  );
};

export default Tribes;
