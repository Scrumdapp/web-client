import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import Stars from "./checkpointcomponents/Stars.tsx";
import { getStarsColor, getAttendanceColor } from "../../js/utils/colorUtils.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getformatPresence } from "../../js/utils/colorUtils.ts";
import { useEffect, useState, useCallback } from "react";
import Modal from "../../components/generic/modal/Modal.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../components/generic/modal/components/ModalCancelButton.tsx";
import { StarsDropDownMenu } from "./checkpointcomponents/StarsDropDownMenu.tsx";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { ErrorScreen } from "../generic/ErrorScreen.tsx";
import { ApiError } from "../../js/hooks/api/apiError.ts";
import { GroupCheckpoint } from "../../js/models/checkpoint.ts";
import { AttendanceDropDownMenu } from "./checkpointcomponents/AttendanceDropDownMenu.tsx";

type CheckpointUser = { user_id: number; first_name: string; last_name: string };

type SessionCheckpointRow = GroupCheckpoint & {
  first_name: string;
  last_name: string;
};

function useGroupCheckpoints(groupId: number, sessionId: number, users: CheckpointUser[]) {
  const [rows, setRows] = useState<SessionCheckpointRow[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async (currentUsers: CheckpointUser[]) => {
    setLoading(true);
    setError(null);
    try {
      const checkpoints = await ScrumdappApi.getGroupCheckpointsBySession()(groupId, sessionId);
      setRows(
        currentUsers.map((user) => {
          const checkpoint = checkpoints.find((entry) => entry.groupUser === user.user_id);
          const base: GroupCheckpoint = checkpoint ?? {
            id: user.user_id,
            sessionId,
            groupUser: user.user_id,
            presence: null,
            stars: null,
            comment: null,
            impediment: null,
          };
          return { ...base, first_name: user.first_name, last_name: user.last_name };
        })
      );
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError(999, "Unhandled error", err as Error));
    } finally {
      setLoading(false);
    }
  }, [groupId, sessionId]);

  useEffect(() => {
    fetch(users).catch(console.error);
  }, [fetch, users]);

  return { rows, setRows, error, loading, refresh: () => fetch(users).catch(console.error) };
}

function Checkpoint({
    groupId,
    date,
    name,
    startTime,
    duration,
    sessionId,
    users,
    currentUser,
    ownerId,
  }: {
    groupId: number;
    date: string;
    name: string;
    startTime: number;
    duration: number;
    sessionId: number;
    users: CheckpointUser[];
    currentUser: { id: number } | null | undefined;
    ownerId: number;
  }) {
  const modal = useModalState();

  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, startTime + duration - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = Math.max(0, startTime + duration - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [startTime, duration]);

  const isLocked = timeLeft <= 0;

  useEffect(() => {
    if (isLocked) modal.close();
  }, [isLocked, modal]);

  const { rows, setRows, error: rowsError, loading: rowsLoading, refresh } = useGroupCheckpoints(groupId, sessionId, users);

  const [notes, setNotes] = useState("");
  const [selectedPresence, setSelectedPresence] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [obstacle, setObstacle] = useState("");

  const [applyError, setApplyError] = useState<ApiError | null>(null);
  const [applyLoading, setApplyLoading] = useState(false);

  const myUserId = currentUser?.id ?? null;

  const handleApply = async () => {
    if (myUserId == null || isLocked) return;
    setApplyLoading(true);
    setApplyError(null);
    try {
      await ScrumdappApi.updateGroupCheckpoint()(groupId, sessionId, {
        userId: myUserId,
        presence: selectedPresence,
        stars: selectedStar,
        comment: notes,
        impediment: obstacle,
      });
      setRows(prev =>
          prev?.map(row =>
            row.groupUser === myUserId
              ? { ...row, presence: selectedPresence, stars: selectedStar, comment: notes, impediment: obstacle }
              : row
          ) ?? prev
      );
      modal.close();
    } catch (err) {
      if (err instanceof ApiError) setApplyError(err);
      else setApplyError(new ApiError(999, "Unhandled error", err as Error));
    } finally {
      setApplyLoading(false);
    }
  };

  const handleOpen = () => {
    if (rows == null) return;
    setApplyError(null);
    const myRow = rows.find(row => row.groupUser === myUserId);
    setSelectedPresence(myRow?.presence ? String(myRow.presence) : null);
    setSelectedStar(myRow?.stars ?? null);
    setNotes(myRow?.comment ?? "");
    setObstacle(myRow?.impediment ?? "");
    modal.open();
  };

  if (rowsLoading || rows === null) return <LoadScreen />;
  if (rowsError) return <ErrorScreen error={rowsError} />;

  const isSessionmaster = myUserId === ownerId;

  const isInGroup = users.some(user => user.user_id === myUserId);

  return (
      <div className="card w-full space-x-5">
        <div className="flex flex-row items-center justify-between mr-0">
            <h2>{name}</h2>
            <div className="flex items-center gap-3">
            <button
                className="btn border"
                onClick={refresh}
                disabled={rowsLoading}
            >
              Refresh
            </button>
              {isInGroup && (
            <button
                className={`btn border ${isLocked ? "opacity-50 cursor-not-allowed!" : ""}`}
                onClick={handleOpen}
                disabled={isLocked}
            >
              <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
              Edit Checkpoint
            </button>
                  )}
            </div>
          </div>
        <hr className="my-2 mr-0" />
        <p>
          {isLocked
            ? "Checkpoint closed"
            : `Closes in ${Math.floor(timeLeft / 60000)}:${String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, "0")}`}
        </p>
        <table className="table-fixed w-full">
          <thead>
          <tr>
            <th className="py-3 text-left">Name</th>
            <th className="py-3 text-left pl-2 border-l border-dotted">Attendance</th>
            <th className="py-3 items-center pl-2">How're you feeling?</th>
            <th className="py-3 text-left pl-2 w-[25%]">Comment</th>
            <th className="py-3 text-left pl-2 w-[25%]">Obstacle</th>
            {isSessionmaster && <th className="py-3 text-left pl-2 w-[5%]">Edit</th>}
          </tr>
          </thead>
          <tbody>
          {rows.map((item) => (
              <tr key={`${item.groupUser === item.id ? 'u' : 'cp'}-${item.id}`}>
                <td className="py-3 text-left pl-2 name-field border-r border-t border-dotted border-current!">
                  {item.first_name} {item.last_name}
                </td>
                <td className={`py-3 text-left p-3 border-t border-dotted border-current`}>
                  <div className={`${getAttendanceColor(getformatPresence(item.presence ? String(item.presence) : "---"))}`}>
                    {getformatPresence(item.presence ? String(item.presence) : "---")}
                  </div>
                </td>
                <td className={`p-3 border-t border-dotted border-current`}>
                  <div className={`flex justify-center items-center ${getStarsColor(item.stars)}`}>
                    <Stars amount={item.stars} />
                  </div>
                </td>
                <td className="p-3 break-words border-t border-dotted">
                  {item.comment}
                </td>
                <td className="p-3 break-words border-t border-dotted">
                  {item.impediment}
                </td>
                {isSessionmaster && (
                  <td className="border-t border-dotted">
                    <Link
                        to={`/groups/${groupId}/edit?date=${date}&session=${sessionId}`}
                        className="btn border w-fit aspect-square"
                    >
                      <FontAwesomeIcon icon={faPencil} className="text-blue" />
                    </Link>
                  </td>
                )}
              </tr>
          ))}
          </tbody>
        </table>
        <Modal state={modal}>
          <div className="space-y-5">
            <ModalHeadText>Edit Checkpoint</ModalHeadText>
            <div className="flex flex-col space-y-2 w-full">
              <label>Attendance</label>
              <AttendanceDropDownMenu
                value={selectedPresence}
                onChange={setSelectedPresence}
              />
              <label>Stars</label>
              <StarsDropDownMenu
                value={selectedStar}
                onChange={setSelectedStar}
              />
              <label>Notes</label>
              <input
                className="write-section"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <label>Obstacle</label>
              <input
                className="write-section"
                placeholder="Obstacle"
                value={obstacle}
                onChange={(e) => setObstacle(e.target.value)}
              />
            </div>
            {applyError && <p className="text-red text-right">{applyError.message}</p>}
            <ModalActionRow>
              <ModalCancelButton />
              <button
                className="btn border"
                onClick={handleApply}
                type="button"
                disabled={applyLoading}
              >
                {applyLoading ? "Saving..." : "Apply"}
              </button>
            </ModalActionRow>
          </div>
        </Modal>
      </div>
  );
}

export default Checkpoint;