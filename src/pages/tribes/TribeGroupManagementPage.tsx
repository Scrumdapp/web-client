import { useTranslation } from "react-i18next";
import { useTribe } from "../../js/context/tribe/useTribe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../js/hooks/useModalState";
import { CreateGroupModal } from "../../components/modals/CreateGroupModal";
import TribeGroupList from "../../components/tribes/TribeGroupList";

export function TribeGroupManagementPage() {
  const { t } = useTranslation();
  const tribe = useTribe();
  const modal = useModalState();

  const groups = tribe.groups;

  return (
    <div className="vertical gap-4">
      <title>{t("tribes.groups.title")}</title>
      <div className="card">
        <h2>{t("tribes.groups.header")}</h2>
      </div>
      <div>
        <div className="flex items-center gap-2 md:col-start-3 md:justify-self-end">
          <button className="btn bg-bg_h border max-h-fit">
            <FontAwesomeIcon icon={faFileImport} />

            {t("tribes.groups.import")}
          </button>

          <button className="btn btn-red border max-h-fit" onClick={modal.open}>
            {t("groups.newgroup")}
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      {groups.length > 0 ? (
        <div className="card p-1 md:p-4">
          <div className="flex justify-between">
            <h2>{t("tribes.groups.list.header")}</h2>
            <span className="text-fg3 text-sm">
              {t("tribes.groups.list.groupCount", { count: groups.length })}
            </span>
          </div>
          <hr className="mt-2 mr-0" />
          <TribeGroupList groups={groups} />
        </div>
      ) : (
        <div className="py-4 flex flex-col items-center text-center justify-center gap-2">
          <h2>{t("tribes.groups.noResults.title")}</h2>
          <p className="text-center">
            {t("tribes.groups.noResults.description")}
          </p>
        </div>
      )}
      <CreateGroupModal state={modal} />
    </div>
  );
}
