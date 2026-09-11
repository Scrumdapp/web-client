import Checkpoint from "../../components/checkins/Checkpoint.tsx";
import { Link } from "react-router-dom";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../js/utils/scrumdappDate.ts";
import { faAdd, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { useUser } from "../../js/context/user/useUser.ts";
import { ErrorScreen } from "../../components/generic/ErrorScreen.tsx";
import { CreateGroupCheckpointSessionModal } from "../../components/modals/CreateGroupCheckpointSessionModal.tsx";
import { ShowIf } from "../../components/utility/Conditional.tsx";
import { parseWeekDay } from "../../js/utils/timeUtils.ts";
import { Group } from "../../js/models/group.ts";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { useTranslation } from "react-i18next";

export function GroupCheckpointPage({
  group,
  date,
  currentDate,
  modal,
}: {
  group: Group;
  date: string;
  currentDate: string;
  modal: ModalState;
}) {
  const { t } = useTranslation();

  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  const prevDate = toScrumdappDate(prev);

  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  const nextDate = toScrumdappDate(next);

  const currentUser = useUser();

  const getGroupUsers = useApi(ScrumdappApi.getGroupUsers(), {
    fetchOnCreated: [group.id],
  });
  const getCheckpointSessions = useApi(ScrumdappApi.getCheckpointSessions(), {
    fetchOnCreated: [group.id, { date }],
  });

  if (getGroupUsers.loading || getCheckpointSessions.loading) {
    return <LoadScreen />;
  }

  if (getGroupUsers.error != null) {
    return <ErrorScreen error={getGroupUsers.error} />;
  }

  if (getCheckpointSessions.error != null) {
    return <ErrorScreen error={getCheckpointSessions.error} />;
  }

  const checkpointSessions = getCheckpointSessions.data!;
  const groupUsers = getGroupUsers.data!;

  const groupCreated = () => {
    getCheckpointSessions.runCommand(group.id, { date });
  };

  return (
    <div className="space-y-3 ">
      <title>{group.name ? `${group.name} | Scrumdapp` : "Scrumdapp"}</title>
      <div className="flex justify-between card w-full h-20 bg-bg_h border rounded-lg p-2 items-center">
        <div className="horizontal items-center">
          <Link to={`/groups/${group.id}?date=${prevDate}`} className="btn">
            <FontAwesomeIcon icon={faChevronDown} className="rotate-90" />
          </Link>
          <h2 className="px-2">
            {t(parseWeekDay(parseScrumdappDate(date).getUTCDay()))} {date}
          </h2>
          <Link
            to={`/groups/${group.id}?date=${nextDate}`}
            className={`btn ${date === currentDate ? "opacity-50 pointer-events-none" : ""}`}
            aria-disabled={date === currentDate}
            tabIndex={date === currentDate ? -1 : undefined}
            onClick={(e) => {
              if (date === currentDate) e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} className="rotate-270" />
          </Link>
        </div>
        <ShowIf condition={currentDate == date}>
          <button className="btn border" onClick={modal.open}>
            <FontAwesomeIcon icon={faAdd} className="text-blue" />{" "}
            {t("checkpoint.create")}
          </button>
        </ShowIf>
      </div>
      {[...checkpointSessions].reverse().map((session, index) => (
        <div key={session.id} className="w-full">
          <Checkpoint
            groupId={group.id}
            key={session.id}
            name={session.name}
            startTime={new Date(session.startTime).getTime()}
            duration={session.duration * 60_000}
            sessionId={session.id}
            users={groupUsers}
            currentUser={currentUser}
            ownerId={session.ownerId}
            isMostRecent={index === 0}
          />
        </div>
      ))}
      <CreateGroupCheckpointSessionModal
        groupId={group.id}
        state={modal}
        onCreated={groupCreated}
      />
    </div>
  );
}
