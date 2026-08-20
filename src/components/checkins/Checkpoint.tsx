import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import Stars from "./checkpointcomponents/Stars.tsx";
import { getStarsColor, getAttendanceColor, getformatPresence } from "../../js/utils/colorUtils.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faChevronDown, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback, useMemo } from "react";
import Modal from "../../components/generic/modal/Modal.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../components/generic/modal/components/ModalCancelButton.tsx";
import { StarsDropDownMenu } from "./checkpointcomponents/StarsDropDownMenu.tsx";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { ErrorScreen } from "../generic/ErrorScreen.tsx";
import { ApiError } from "../../js/hooks/api/apiError.ts";
import { GroupCheckpoint, GroupCheckpointSession, UpdateGroupCheckpoint } from "../../js/models/checkpoint.ts";
import { AttendanceDropDownMenu } from "./checkpointcomponents/AttendanceDropDownMenu.tsx";

type CheckpointUser = { user_id: number; first_name: string; last_name: string };

type SessionCheckpointRow = GroupCheckpoint & {
    first_name: string;
    last_name: string;
};

function toApiError(err: unknown): ApiError {
    return err instanceof ApiError ? err : new ApiError(999, "Unhandled error", err as Error);
}

function useGroupCheckpoints(groupId: number, sessionId: number, users: CheckpointUser[]) {
    const [rows, setRows] = useState<SessionCheckpointRow[] | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState(false);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const checkpoints = await ScrumdappApi.getGroupCheckpoints()(groupId, sessionId);
            setRows(
                users.map((user) => {
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
            setError(toApiError(err));
        } finally {
            setLoading(false);
        }
    }, [groupId, sessionId, users]);

    return { rows, setRows, error, loading, fetch };
}

function useCountdown(startTime: number, duration: number) {
    const target = startTime + duration;
    const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target - Date.now()));

    useEffect(() => {
        const remainingNow = Math.max(0, target - Date.now());
        setTimeLeft(remainingNow);
        if (remainingNow <= 0) return;

        const id = setInterval(() => {
            const remaining = Math.max(0, target - Date.now());
            setTimeLeft(remaining);
            if (remaining <= 0) clearInterval(id);
        }, 1000);
        return () => clearInterval(id);
    }, [target]);

    return timeLeft;
}

function formatTimeLeft(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function Checkpoint({
    session,
    users,
    currentUser,
    isMostRecent,
    } : {
    session: GroupCheckpointSession;
    users: CheckpointUser[];
    currentUser: { id: number } | null | undefined;
    isMostRecent?: boolean;
}) {
    const { id: sessionId, groupId, name, ownerId } = session;
    const startTime = useMemo(() => new Date(session.startTime).getTime(), [session.startTime]);
    const duration = session.duration * 60_000;

    const modal = useModalState();

    const timeLeft = useCountdown(startTime, duration);
    const isLocked = timeLeft <= 0;

    useEffect(() => {
        if (isLocked) modal.close();
    }, [isLocked]);

    const { rows, setRows, error: rowsError, loading: rowsLoading, fetch } = useGroupCheckpoints(groupId, sessionId, users);

    useEffect(() => {
        fetch().catch(console.error);
    }, [fetch]);

    const [notes, setNotes] = useState("");
    const [selectedPresence, setSelectedPresence] = useState<string | null>(null);
    const [selectedStar, setSelectedStar] = useState<number | null>(null);
    const [obstacle, setObstacle] = useState("");

    const [applyError, setApplyError] = useState<ApiError | null>(null);
    const [applyLoading, setApplyLoading] = useState(false);

    const myUserId = currentUser?.id ?? null;

    const [editingUser, setEditingUser] = useState<SessionCheckpointRow | null>(null);

    const [isExpanded, setIsExpanded] = useState(!isLocked || isMostRecent);

    const handleApply = async () => {
        const targetUserId = editingUser ? editingUser.groupUser : myUserId;
        if (targetUserId == null || isLocked) return;

        setApplyLoading(true);
        setApplyError(null);
        try {
            const payload: UpdateGroupCheckpoint = {
                userId: targetUserId,
                sessionId,
                presence: selectedPresence,
                stars: selectedStar,
                comment: notes,
                impediment: obstacle,
            };
            await ScrumdappApi.updateGroupCheckpoint()(groupId, payload);
            setRows(prev =>
                prev?.map(row =>
                    row.groupUser === targetUserId
                        ? { ...row, presence: selectedPresence, stars: selectedStar, comment: notes, impediment: obstacle }
                        : row
                ) ?? prev
            );
            modal.close();
        } catch (err) {
            setApplyError(toApiError(err));
        } finally {
            setApplyLoading(false);
        }
    };

    const openModalFor = (row: SessionCheckpointRow | null) => {
        if (rows == null) return;
        setApplyError(null);
        setEditingUser(row);
        const source = row ?? rows.find(r => r.groupUser === myUserId);
        setSelectedPresence(source?.presence ? String(source.presence) : null);
        setSelectedStar(source?.stars ?? null);
        setNotes(source?.comment ?? "");
        setObstacle(source?.impediment ?? "");
        modal.open();
    };

    const handleToggle = () => setIsExpanded(prev => !prev);

    if (rowsLoading || rows === null) return <LoadScreen />;
    if (rowsError) return <ErrorScreen error={rowsError} />;

    const isSessionmaster = myUserId === ownerId;
    const isInGroup = users.some(user => user.user_id === myUserId);
    const showEditColumn = (isSessionmaster || isInGroup) && !isLocked;

    return (
        <div className="card w-full space-x-5">
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
                        <FontAwesomeIcon icon={faArrowsRotate} className="text-blue" /> Refresh
                    </button>
                </div>
            </div>
            <p>{isLocked ? "Checkpoint closed" : `Closes in ${formatTimeLeft(timeLeft)}`}</p>
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
                            <th className="p-2 text-left w-44">Name</th>
                            <th className="p-2 text-left border-l border-dotted w-28">Attendance</th>
                            <th className="p-2 items-center w-28">Stars</th>
                            <th className="p-2 text-left">Comment</th>
                            <th className="p-2 text-left">Obstacle</th>
                            {showEditColumn && <th className="p-2 pl-0 text-right w-10">Edit</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((item) => {
                            const presenceLabel = getformatPresence(item.presence ? String(item.presence) : "---");
                            const isOwnRow = item.groupUser === myUserId;
                            return (
                                <tr key={item.groupUser} className="align-top">
                                    <td className="p-2 text-left name-field border-r border-t border-dotted border-current! min-h-14 h-14">
                                        {item.first_name} {item.last_name}
                                    </td>
                                    <td className="text-left p-2 border-t border-dotted border-current">
                                        <div className={getAttendanceColor(presenceLabel)}>{presenceLabel}</div>
                                    </td>
                                    <td className="p-2 border-t border-dotted border-current">
                                        <div className={`flex justify-center items-center ${getStarsColor(item.stars)}`}>
                                            <Stars amount={item.stars} />
                                        </div>
                                    </td>
                                    <td className="p-2 break-words border-t border-dotted">{item.comment}</td>
                                    <td className="p-2 break-words border-t border-dotted">{item.impediment}</td>
                                    {showEditColumn && (
                                        <td className="border-t border-dotted p-2 pl-0">
                                            {isSessionmaster ? (
                                                <button className="btn border aspect-square" onClick={() => openModalFor(item)}>
                                                    <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
                                                </button>
                                            ) : isOwnRow ? (
                                                <button className="btn border aspect-square" onClick={() => openModalFor(null)}>
                                                    <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
                                                </button>
                                            ) : null}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal state={modal}>
                <div className="space-y-5">
                    <ModalHeadText>
                        {`Edit Checkpoint ${editingUser ? `for ${editingUser.first_name} ${editingUser.last_name}` : ""}`}
                    </ModalHeadText>
                    <div className="flex flex-col space-y-2 w-full">
                        <label>Attendance</label>
                        <AttendanceDropDownMenu value={selectedPresence} onChange={setSelectedPresence} />
                        <label>Stars</label>
                        <StarsDropDownMenu value={selectedStar} onChange={setSelectedStar} />
                        <label>Notes</label>
                        <input
                            className="write-section"
                            placeholder="Notes"
                            alt="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <label>Obstacle</label>
                        <input
                            className="write-section"
                            placeholder="Obstacle"
                            alt="Obstacle"
                            value={obstacle}
                            onChange={(e) => setObstacle(e.target.value)}
                        />
                    </div>
                    {applyError && <p className="text-red text-right">{applyError.message}</p>}
                    <ModalActionRow>
                        <ModalCancelButton />
                        <button className="btn border" onClick={handleApply} type="button" disabled={applyLoading}>
                            {applyLoading ? "Saving..." : "Apply"}
                        </button>
                    </ModalActionRow>
                </div>
            </Modal>
        </div>
    );
}

export default Checkpoint;