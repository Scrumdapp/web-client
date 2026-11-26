import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Tribe,
  TribeCheckpoint as TribeCheckpointInterface,
} from "../../js/models/tribe";
import TribeCheckpointTable from "./TribeCheckpointTable";
import { Collapse } from "../generic/Collapse";

function TribeCheckpoint({
  tribe,
  session,
  groupCount,
  userCount,
  isMostRecent,
}: {
  tribe: Tribe;
  session: TribeCheckpointInterface;
  groupCount: number;
  userCount: number;
  isMostRecent?: boolean;
}) {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(!!isMostRecent);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const filledInTotal = session.group_sessions.reduce(
    (total, group) =>
      total + (group.session?.presences.filter((p) => p.presence)?.length ?? 0),
    0,
  );

  return (
    <div className="card p-2 md:p-4 w-full space-x-0 md:space-x-5">
      <div className="flex flex-row items-center justify-between mr-0">
        <button
          className="flex items-center gap-2 text-left cursor-pointer w-full"
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
          <div className="gap-3 flex items-center justify-between w-full">
            <h2>{session.session_name}</h2>
          </div>
        </button>
      </div>
      <p className="text-fg2">
        {t("tribes.checkpoint.checkpointTitleDescription", {
          activeGroupCount: session.group_sessions?.filter(
            (g) => g.session !== null,
          )?.length,
          activeUserCount: filledInTotal,
          groupCount,
          userCount,
        })}
      </p>
      <Collapse open={isExpanded}>
        <hr className="mt-2 mr-0" />
        <TribeCheckpointTable
          tribe={tribe}
          groupSessions={session.group_sessions}
        />
      </Collapse>
    </div>
  );
}

export default TribeCheckpoint;
