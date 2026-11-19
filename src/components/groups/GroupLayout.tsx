import { useParams } from "react-router-dom";
import { GroupProvider } from "../../js/context/group/GroupProvider.tsx";
import { groupContext } from "../../js/context/group/groupContext.ts";
import { GroupRouter } from "../../router/GroupRouter.tsx";
import { BackgroundOverride } from "../../js/context/background/BackgroundOverride.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { NavigationSidebar } from "../generic/NavigationSidebar.tsx";
import NavigationSidebarModal from "../modals/NavigationSidebarModal.tsx";
import { SidebarDates } from "../generic/navigation/SidebarDates.tsx";

export function GroupLayout() {
  const modal = useModalState();
  const params = useParams();
  const groupId = parseInt(params.groupId ?? "nan");

  if (isNaN(groupId)) return <ErrorPage />;

  const GroupConsumer = groupContext.Consumer;

  const navigationBasePath = `/groups/${groupId}`;

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
              <NavigationSidebarModal modal={modal} title={ctx!!.group!!.name}>
                <NavigationSidebar
                  scope="group"
                  basePath={navigationBasePath}
                  onNavigate={modal.close}
                />
              </NavigationSidebarModal>
            </>
          )}
        </GroupConsumer>
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-4">
            <NavigationSidebar
              scope="group"
              basePath={navigationBasePath}
              className="card"
            />
            <SidebarDates scope="group" entityId={groupId} />
          </div>
          <div className="flex-1 flex flex-col">
            <GroupRouter />
          </div>
        </div>
      </div>
    </GroupProvider>
  );
}
