import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import Stars from "./checkpointcomponents/Stars.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faChevronDown,
  faEye,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback } from "react";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { ErrorScreen } from "../generic/ErrorScreen.tsx";
import { ApiError } from "../../js/hooks/api/apiError.ts";
import { GroupCheckpoint } from "../../js/models/checkpoint.ts";
import { useTranslation } from "react-i18next";
import {
  getStarsColor,
  getAttendanceColor,
  getAttendanceLabelKey,
} from "../../js/utils/colorUtils.ts";
import EditCheckpointModal from "../modals/EditCheckpointModal.tsx";
import ReadOnlyCheckpointModal from "../modals/ReadOnlyCheckpointModal.tsx";

type CheckpointUser = {
  user_id: number;
  first_name: string;
  last_name: string;
};

type SessionCheckpointRow = GroupCheckpoint & {
  first_name: string;
  last_name: string;
};

function useGroupCheckpoints(
  groupId: number,
  sessionId: number,
  users: CheckpointUser[],
) {
  const [rows, setRows] = useState<SessionCheckpointRow[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const checkpoints = await ScrumdappApi.getGroupCheckpoints()(
        groupId,
        sessionId,
      );
      setRows(
        users.map((user) => {
          const checkpoint = checkpoints.find(
            (entry) => entry.groupUser === user.user_id,
          );
          const base: GroupCheckpoint = checkpoint ?? {
            id: user.user_id,
            sessionId,
            groupUser: user.user_id,
            presence: null,
            stars: null,
            comment: null,
            impediment: null,
          };
          return {
            ...base,
            first_name: user.first_name,
            last_name: user.last_name,
          };
        }),
      );
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err
          : new ApiError(
              999,
              "Unhandled error while fetching checkpoints",
              err as Error,
            ),
      );
    } finally {
      setLoading(false);
    }
  }, [groupId, sessionId, users]);

  return { rows, setRows, error, loading, fetch };
}

function Checkpoint({
  groupId,
  name,
  startTime,
  duration,
  sessionId,
  users,
  currentUser,
  ownerId,
  isMostRecent,
}: {
  groupId: number;
  name: string;
  startTime: number;
  duration: number;
  sessionId: number;
  users: CheckpointUser[];
  currentUser: { id: number } | null | undefined;
  ownerId: number;
  isMostRecent?: boolean;
}) {
  const modal = useModalState();
  const modalReadOnly = useModalState();

  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, startTime + duration - Date.now()),
  );

  const [selectedUser, setSelectedUser] = useState<SessionCheckpointRow | null>(
    null,
  );
  const [editSession, setEditSession] = useState(0);

  const openEdit = (row: SessionCheckpointRow) => {
    setSelectedUser(row);
    setEditSession((n) => n + 1);
    modal.open();
  };

  const openReadOnly = (row: SessionCheckpointRow) => {
    setSelectedUser(row);
    modalReadOnly.open();
  };

  const handleSaved = (
    patch: Pick<
      GroupCheckpoint,
      "groupUser" | "presence" | "stars" | "comment" | "impediment"
    >,
  ) =>
    setRows(
      (prev) =>
        prev?.map((r) =>
          r.groupUser === patch.groupUser ? { ...r, ...patch } : r,
        ) ?? prev,
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

  const {
    rows,
    setRows,
    error: rowsError,
    loading: rowsLoading,
    fetch,
  } = useGroupCheckpoints(groupId, sessionId, users);

  useEffect(() => {
    fetch().catch(console.error);
  }, [fetch]);

  const myUserId = currentUser?.id ?? null;

  const [isExpanded, setIsExpanded] = useState(!isLocked || isMostRecent);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  if (rowsError) return <ErrorScreen error={rowsError} />;
  if (rowsLoading || rows === null) return <LoadScreen />;

  const isSessionmaster = myUserId === ownerId;
  const isInGroup = users.some((user) => user.user_id === myUserId);

  const canEdit = (row: SessionCheckpointRow) =>
    !isLocked && (isSessionmaster || (isInGroup && row.groupUser === myUserId));

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
            <h2>{name}</h2>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <button
            className="btn border"
            onClick={() => fetch().catch(console.error)}
            disabled={rowsLoading}
          >
            <FontAwesomeIcon icon={faArrowsRotate} className="text-blue" />{" "}
            {t("checkpoint.refresh")}
          </button>
        </div>
      </div>
      <p className="pt-1 md:pt-0">
        {isLocked ? (
          t("checkpoint.closed")
        ) : (
          <>
            {t("checkpoint.closesin")}{" "}
            {`${Math.floor(timeLeft / 60000)}:${String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, "0")}`}
          </>
        )}
      </p>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <hr className="my-2 mr-0" />
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="p-1 md:p-2 text-left w-16 md:w-44">
                  {t("checkpoint.name")}
                </th>
                <th className="p-1 md:p-2 text-left border-l border-dotted w-16 md:w-28 truncate">
                  {t("checkpoint.attendance")}
                </th>
                <th className="p-2 items-center w-20 md:w-28 truncate">
                  {t("checkpoint.stars")}
                </th>
                <th className="p-1 md:p-2 text-left hidden lg:table-cell md:w-28 truncate">
                  {t("checkpoint.notes")}
                </th>
                <th className="p-1 md:p-2 text-left hidden lg:table-cell md:w-28 truncate">
                  {t("checkpoint.obstacle")}
                </th>
                <th className="p-1 md:p-2 pl-0 text-right w-12 md:w-20 truncate">
                  {t("checkpoint.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr
                  key={`${item.groupUser === item.id ? "u" : "cp"}-${item.id}`}
                  className="align-top"
                >
                  <td className="p-2 text-left name-field border-r border-t border-dotted border-current! max-h-14">
                    {item.first_name} {item.last_name}
                  </td>
                  <td className="text-left p-2 border-t border-dotted border-current">
                    <div className={getAttendanceColor(item.presence)}>
                      {t(getAttendanceLabelKey(item.presence))}
                    </div>
                  </td>
                  <td className="p-2 border-t border-dotted border-current">
                    <div
                      className={`flex justify-center items-center ${getStarsColor(item.stars)}`}
                    >
                      <Stars amount={item.stars} />
                    </div>
                  </td>
                  <td className="p-2 break-words border-t border-dotted hidden lg:table-cell">
                    <p className="break-words line-clamp-2">{item.comment}</p>
                  </td>
                  <td className="p-2 break-words border-t border-dotted hidden lg:table-cell">
                    <p className="break-words line-clamp-2">
                      {item.impediment}
                    </p>
                  </td>
                  <td className="border-t border-dotted py-2 horizontal gap-1 md:gap-2">
                    <button
                      className="btn p-1 md:p-2 border aspect-square ml-auto mr-0 mt-0"
                      onClick={() => openReadOnly(item)}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="icon text-blue"
                      />
                    </button>
                    {canEdit(item) && (
                      <button
                        className="btn p-1 md:p-2 border aspect-square ml-auto mr-0 mt-0"
                        onClick={() => openEdit(item)}
                      >
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="icon text-blue"
                        />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditCheckpointModal
        key={editSession}
        modal={modal}
        groupId={groupId}
        row={selectedUser}
        onSaved={handleSaved}
      />

      <ReadOnlyCheckpointModal modal={modalReadOnly} row={selectedUser} />
    </div>
  );
}

export default Checkpoint;
