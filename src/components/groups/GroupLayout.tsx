import { useParams } from "react-router-dom";
import { GroupProvider } from "../../js/context/group/GroupProvider.tsx";
import { GroupSidebar } from "./GroupSidebar.tsx";
import { GroupSidebarMobile } from "./GroupSidebarMobile.tsx";
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
                <h1 className="text-xl md:text-2xl"> {ctx!!.group!!.name} </h1>
              </div>
        {menuOpen && (
            <div
                className="fixed inset-0 z-40 flex px-2 pt-16 backdrop-blur-lg bg-[unset] w-full max-w-screen md:hidden"
                onClick={() => setMenuOpen(false)}
            >
              <div
                  className="bg-bg_h rounded-xl border shadow-xl w-full overflow-hidden h-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    if ((e.target as HTMLElement).closest("a, button")) {
                      setMenuOpen(false);
                    }
                  }}
              >
                <div className="flex flex-col divide-y">
                  <div className="p-2">
                    <div className="flex justify-between">
                      <h1 className="pl-2 p-1 text-xl md:text-2xl"> {ctx!!.group!!.name} </h1>
                      <button className="pr-2 p-1"><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    <GroupSidebarMobile />
                  </div>
                </div>
              </div>
            </div>
        )}
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
