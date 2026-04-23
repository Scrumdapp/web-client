import { useGroup } from "../../js/context/group/useGroup.ts";
import Checkpoint from "../../components/checkins/Checkpoint.tsx";
import { useSearchParams } from "react-router-dom";
import { toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import Modal from "../../components/generic/modal/Modal.tsx";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../components/generic/modal/components/ModalCancelButton.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";
import {faAdd, faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useCallback, useContext } from "react";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {userContext} from "../../js/context/user/userContext.ts";
import {LoadScreen} from "../../components/generic/LoadScreen.tsx";
import {useApi} from "../../js/hooks/api/useApi.ts";


export function GroupCheckinPage() {
  const group = useGroup();
  const modal = useModalState();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? toScrumdappDate(new Date());

    const updateGroupCheckpoints = useApi(ScrumdappApi.updateGroupCheckpoints());

    type Checkpoint = {
    id: number;
    date: string;
    name: string;
    startTime: number;
    sessionId: number;
  };

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [checkpointName, setCheckpointName] = useState("");
  const [users, setUsers] = useState<{ user_id: number; first_name: string; last_name: string }[]>([]);

  const { user: currentUser } = useContext(userContext) ?? {};

  useEffect(() => {
      let active = true;
      ScrumdappApi.getGroupUsers()(group.id).then((groupUsers) => {
          if (!active) return;
          setUsers(groupUsers);
      });
      return () => { active = false; };
      }, [group.id]);


    const parseStartTime = (sessionDate: string, sessionStartTime: string) => {
    const parsed = new Date(`${sessionDate}T${sessionStartTime}`).getTime();
    return Number.isNaN(parsed) ? Date.now() : parsed;
  };

  const loadSessions = useCallback(async () => {
    const sessions = await ScrumdappApi.getCheckpointSessions()(
      group.id,
      undefined,
      date,
    );
    setCheckpoints(
      sessions.map((session) => ({
        id: session.id,
        date: session.date,
        name: session.name,
        startTime: parseStartTime(session.date, session.startTime),
        sessionId: session.id,
      })),
    );
  }, [group.id, date]);

  useEffect(() => {
    void loadSessions();
  }, [group.id, date]);

  const handleCreate = async () => {
    if (!checkpointName.trim()) return;

    await ScrumdappApi.createCheckpointSessions()(group.id, {
      name: checkpointName.trim(),
    });

    await loadSessions();
    setCheckpointName("");
    modal.accept();
  };

  return (
    <div className="space-y-3 ">
      <div className="flex justify-between card w-7/10 h-20 bg-bg_h border rounded-lg p-2 items-center">
        <h2 className="px-2">{date}</h2>
        <button className="btn border" onClick={modal.open}>
          <FontAwesomeIcon icon={faAdd} className="text-blue" /> Create Session
        </button>
      </div>
      {checkpoints.map((checkpoint) => (
        <div key={checkpoint.id} className="w-full">
          <Checkpoint
            groupId={group.id}
            date={checkpoint.date}
            key={checkpoint.id}
            name={checkpoint.name}
            startTime={checkpoint.startTime}
            sessionId={checkpoint.sessionId}
            users={users}
            currentUser={currentUser}
          />
        </div>
      ))}
      <Modal state={modal}>
        <div className="space-y-5">
          <ModalHeadText>New Session</ModalHeadText>
          <input
            className="write-section w-full!"
            placeholder="Session Name"
            value={checkpointName}
            maxLength={30}
            onChange={(e) => setCheckpointName(e.target.value)}
            required
          ></input>
          <ModalActionRow>
            <ModalCancelButton />
              <button
                  className={`btn btn-secondary border ${!checkpointName ? "opacity-50 cursor-not-allowed!" : ""}`}
                  disabled={!checkpointName}
                  onClick={handleCreate}
              >
                  <FontAwesomeIcon icon={faCheck} className="icon" />
                  {updateGroupCheckpoints.loading || updateGroupCheckpoints.loading ? (
                      <LoadScreen />
                  ) : (
                      "Create"
                  )}
              </button>
          </ModalActionRow>
        </div>
      </Modal>
    </div>
  );
}