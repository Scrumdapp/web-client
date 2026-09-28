import { useParams } from "react-router-dom";
import { GroupProvider } from "../../js/context/group/GroupProvider.tsx";
import { GroupSidebar } from "./GroupSidebar.tsx";
import { groupContext } from "../../js/context/group/groupContext.ts";
import { GroupRouter } from "../../router/GroupRouter.tsx";
import { GroupSidebarDates } from "./GroupSidebarDates.tsx";
import { BackgroundOverride } from "../../js/context/background/BackgroundOverride.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { useState } from "react";

export function GroupLayout() {
  const params = useParams();
  const groupId = parseInt(params.groupId ?? "nan");

  if (isNaN(groupId)) return <ErrorPage />;

  const GroupConsumer = groupContext.Consumer;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <GroupProvider groupId={groupId}>
      <div className="app-container p-2! pt-0! md:p-4 vertical gap-4 text-xs md:text-base">
        <GroupConsumer>
          {(ctx) => (
            <>
              <BackgroundOverride
                background={ctx!!.group!!.background_preference ?? "1"}
              />
              <div className="flex horizontal justify-start gap-1">
                <div>
                  <button
                      type="button"
                      onClick={() => setMenuOpen((open) => !open)}
                      className="btn aspect-square md:hidden"
                      aria-label={t("header.menuToggle")}
                      aria-expanded={menuOpen}
                  >
                    <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
                  </button>
                </div>
                <div className="text-xl md:text-2xl"> {ctx!!.group!!.name} </div>
              </div>
            </>
          )}
        </GroupConsumer>
        {menuOpen && (
            <div className="bg-bg_h mt-2 rounded-xl border shadow-xl w-full md:hidden overflow-hidden">
              <div className="flex flex-col divide-y">
                <div>
                  <GroupSidebar />
                </div>
              </div>
            </div>
        )}
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
