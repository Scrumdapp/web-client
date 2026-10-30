import { useParams } from "react-router-dom";
import { GroupProvider } from "../../js/context/group/GroupProvider.tsx";
import { GroupSidebar } from "./GroupSidebar.tsx";
import { groupContext } from "../../js/context/group/groupContext.ts";
import { GroupRouter } from "../../router/GroupRouter.tsx";
import { GroupSidebarDates } from "./GroupSidebarDates.tsx";
import { BackgroundOverride } from "../../js/context/background/BackgroundOverride.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { useModalState } from "../../js/hooks/useModalState.ts";
import GroupLayoutModal from "../modals/GroupLayoutModal.tsx";

export function GroupLayout() {
  const modal = useModalState();
  const params = useParams();
  const groupId = parseInt(params.groupId ?? "nan");

  if (isNaN(groupId)) return <ErrorPage />;

  const GroupConsumer = groupContext.Consumer;

  return (
    <GroupProvider groupId={groupId}>
      <div className="app-container p-2! pt-0! md:p-4 vertical gap-4">
        <GroupConsumer>
          {(ctx) => (
            <>
              <BackgroundOverride
                background={ctx!!.group!!.background_preference ?? "1"}
              />
              <div className="flex horizontal justify-start gap-1 mt-6 md:mt-0">
                <div>
                  <button
                    type="button"
                    onClick={modal.open}
                    className="btn aspect-square md:hidden"
                    aria-label={t("header.menuToggle")}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
                <h1> {ctx!!.group!!.name} </h1>
              </div>
              <GroupLayoutModal modal={modal} groupName={ctx!!.group!!.name} />
            </>
          )}
        </GroupConsumer>
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-4">
            <GroupSidebar />
            <GroupSidebarDates />
          </div>
          <div className="flex-1 flex flex-col">
            <GroupRouter />
          </div>
        </div>
      </div>
    </GroupProvider>
  );
}
