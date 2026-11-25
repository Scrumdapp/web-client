import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { GroupCheckpointSession } from "../../js/models/checkpoint.ts";
import { useTranslation } from "react-i18next";
import { CheckpointTimer } from "./CheckpointTimer.tsx";
import { useCreateCheckpointUserMapper } from "./checkpointUserMapper.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { CheckpointTable } from "./CheckpointTable.tsx";
import { RequestStateHandler } from "../generic/RequestStateHandler.tsx";

export function CheckpointSession({
  session,
  isMostRecent,
}: {
  session: GroupCheckpointSession;
  isMostRecent?: boolean;
}) {
  const { t } = useTranslation();

  const [locked, setLocked] = useState(
    () => Date.now() > new Date(session.startTime).getTime() + session.duration,
  );

  const getCheckpointSessions = useApi(ScrumdappApi.getGroupCheckpoints(), {
    mapper: useCreateCheckpointUserMapper(),
  });

  const [isExpanded, setIsExpanded] = useState(!locked || isMostRecent);

  useEffect(() => {
    if (isExpanded && !getCheckpointSessions.data) {
      getCheckpointSessions.runCommand(session.groupId, session.id);
    }
  }, [isExpanded, getCheckpointSessions.runCommand]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

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
            <h2>{session.name}</h2>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <button
            className="btn border"
            onClick={() =>
              getCheckpointSessions
                .runCommand(session.groupId, session.id)
                .catch(console.error)
            }
            disabled={getCheckpointSessions.loading}
          >
            <FontAwesomeIcon icon={faArrowsRotate} className="text-blue" />{" "}
            {t("action.refresh")}
          </button>
        </div>
      </div>
      <CheckpointTimer session={session} onLocked={() => setLocked(true)} />
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <hr className="my-2 mr-0" />
          <RequestStateHandler
            state={getCheckpointSessions}
            withData={(data) => (
              <CheckpointTable
                session={session}
                locked={locked}
                checkpoints={data}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
