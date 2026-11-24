import { useParams } from "react-router-dom";
import { NavigationSidebar } from "../generic/NavigationSidebar.tsx";
import { tribeContext } from "../../js/context/tribe/tribeContext.ts";
import { TribeRouter } from "../../router/TribeRouter.tsx";
import { SidebarDates } from "../generic/navigation/SidebarDates.tsx";
import { BackgroundOverride } from "../../js/context/background/BackgroundOverride.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { TribeProvider } from "../../js/context/tribe/TribeProvider.tsx";
import NavigationSidebarModal from "../modals/NavigationSidebarModal.tsx";
import { useUser } from "../../js/context/user/useUser.ts";
import { hasRole, Role } from "../../js/utils/userPermissions.ts";

export function TribeLayout() {
  const modal = useModalState();
  const params = useParams();
  const tribeId = parseInt(params.tribeId ?? "nan");
  const user = useUser();

  if (isNaN(tribeId)) return <ErrorPage />;

  if (!hasRole(user, Role.Coach)) return <ErrorPage />;

  const TribeConsumer = tribeContext.Consumer;

  const navigationBasePath = `/tribes/${tribeId}`;

  return (
    <TribeProvider tribeId={tribeId}>
      <div className="app-container p-2! pt-0! md:p-4 vertical gap-4">
        <TribeConsumer>
          {(ctx) => (
            <>
              <BackgroundOverride
                background={ctx!!.tribe!!.background_preference ?? "1"}
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
                <h1> {ctx!!.tribe!!.name} </h1>
              </div>
              <NavigationSidebarModal modal={modal} title={ctx!!.tribe!!.name}>
                <NavigationSidebar
                  scope="tribe"
                  basePath={navigationBasePath}
                  onNavigate={modal.close}
                />
              </NavigationSidebarModal>
            </>
          )}
        </TribeConsumer>
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-4">
            <NavigationSidebar
              scope="tribe"
              basePath={navigationBasePath}
              className="card"
            />
            <SidebarDates scope="tribe" entityId={tribeId} />
          </div>
          <div className="flex-1 flex flex-col">
            <TribeRouter />
          </div>
        </div>
      </div>
    </TribeProvider>
  );
}
