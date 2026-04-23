import { AttendanceDropDownMenu } from "./checkpointcomponents/AttendanceDropDownMenu.tsx";
import { StarsDropDownMenu } from "./checkpointcomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkpointcomponents/AttendanceTextArea.tsx";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { UpdateGroupCheckpoint } from "../../js/models/checkpoint.ts";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getAttendanceColor, getformatPresence } from "../../js/utils/colorUtils.ts";

type EditableCheckpoint = UpdateGroupCheckpoint & {
  first_name: string;
  last_name: string;
};

export function ScrummasterCheckpointTable({
  groupId,
  date,
  sessionId,
}: {
  groupId: number;
  date: string;
  sessionId: number;
}) {
  const getGroupCheckpointsBySession = useApi(ScrumdappApi.getGroupCheckpointsBySession());
  const updateCheckpointApi = useApi(ScrumdappApi.updateGroupCheckpoint());
  const getGroupUsers = useApi(ScrumdappApi.getGroupUsers());

  const [checkpoint, setCheckpoint] = useState<EditableCheckpoint[]>([]);

  const getGroupCheckpoints = useCallback(async () => {
    if (sessionId !== undefined) {
      const [users, checkpoints] = await Promise.all([
        getGroupUsers.runCommand(groupId),
        getGroupCheckpointsBySession.runCommand(groupId, sessionId),
      ]);

      setCheckpoint(
          users.map((user) => {
            const checkpoint = checkpoints.find(
                (it) => it.groupUser === user.user_id,
            );

            return {
              userId: user.user_id,
              first_name: user.first_name,
              last_name: user.last_name,
              presence: checkpoint?.presence ?? null,
              comment: checkpoint?.comment ?? null,
              stars: checkpoint?.stars ?? null,
            };
          }),
      );
    } else {
      await getGroupCheckpointsBySession.runCommand(groupId, sessionId!);
    }
  }, [
    groupId,
    sessionId,
    getGroupUsers.runCommand,
    getGroupCheckpointsBySession.runCommand,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    getGroupCheckpoints();
  }, [getGroupCheckpoints]);

  useEffect(() => {
    if (sessionId !== undefined) return;
    if (getGroupCheckpointsBySession.data) {
      setCheckpoint(
          getGroupCheckpointsBySession.data.map((c: any) => ({
          userId: c.userId,
          first_name: c.first_name,
          last_name: c.last_name,
          presence: c.presence,
          comment: c.comment,
          stars: c.stars,
        })),
      );
    }
  }, [getGroupCheckpointsBySession.data, sessionId]);

  if (
    sessionId === undefined &&
    (getGroupCheckpointsBySession.loading || getGroupCheckpointsBySession.data == null)
  ) {
    return <LoadScreen />;
  }

  if (
    sessionId !== undefined &&
    (getGroupUsers.loading || getGroupCheckpointsBySession.loading)
  ) {
    return <LoadScreen />;
  }

  const deleteCheckpoint = async () => {
    const cleared = checkpoint.map((item) => ({
      ...item,
      presence: null,
      stars: null,
      comment: null,
    }));
    setCheckpoint(cleared);
    const payload = cleared.map((item) => ({
      userId: item.userId,
      presence: null,
      stars: null,
      comment: null,
    }));
    if (sessionId !== undefined) {
      await Promise.all(
          payload.map((user) =>
              updateCheckpointApi.runCommand(groupId, sessionId, user),
          ),
      );
    } else {
      await updateCheckpointApi.runCommand(groupId, sessionId, payload);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (updateCheckpointApi.loading) return;

        if (sessionId !== undefined) {
          const mappedUsers = checkpoint.map((it) => ({
            userId: it.userId,
            comment: it.comment ?? null,
            stars: it.stars ?? null,
          }));

          Promise.all(
            mappedUsers.map((user) =>
              updateCheckpointApi.runCommand(groupId, sessionId, user),
            ),
          ).then(() => {
            navigate(`/groups/${groupId}?date=${date}`);
          });
          return;
        }

        const mappedUsers: UpdateGroupCheckpoint[] = checkpoint.map(
          (it) =>
            ({
              userId: it.userId,
              presence: it.presence,
              comment: it.comment,
              stars: it.stars,
            }) as UpdateGroupCheckpoint,
        );

        updateCheckpointApi.runCommand(groupId, sessionId, mappedUsers).then(() => {
          navigate(`/groups/${groupId}?date=${date}`);
        });
      }}
      className={`card flex vertical gap-3 ${updateCheckpointApi.loading || updateCheckpointApi.loading ? "pointer-events-none opacity-70" : ""}`}
    >
      <h2 className="mb-2">
        Checkpoint for <b>{toScrumdappDate(new Date())}</b>
      </h2>
      <table className="checkpoint-table table-fixed w-full">
        <thead>
          <tr className="">
            <th className="w-1/5 pr-2 text-left">Name</th>
            <th className="w-1/5 pr-2 text-left">Attendance</th>
            <th className="w-1/10 pr-2">How're you feeling?</th>
            <th className="w-1/4 pr-2 text-right">Notes</th>
          </tr>
        </thead>
        <tbody>
        {checkpoint.map((item, index) => (
            <tr key={item.userId}>
              <td className="truncate name-field pr-2">
                {item.first_name} {item.last_name}
              </td>
              <td className="pr-2">
                {sessionId !== undefined ? (
                    <span
                        className={getAttendanceColor(
                            getformatPresence(
                                item.presence ? String(item.presence) : "---",
                            ),
                        )}
                    >
            {getformatPresence(
                item.presence ? String(item.presence) : "---",
            )}
          </span>
                ) : (
                    <AttendanceDropDownMenu
                        value={item.presence as string | null}
                        onChange={(value: string | null) => {
                          const updated = [...checkpoint];
                          updated[index].presence = value;
                          setCheckpoint(updated);
                        }}
                    />
                )}
              </td>
              <td className="pr-2">
                <StarsDropDownMenu
                    value={item.stars}
                    onChange={(value: number | null) => {
                      const updated = [...checkpoint];
                      updated[index].stars = value;
                      setCheckpoint(updated);
                    }}
                />
              </td>
              <td className="pr-2">
                <AttendanceTextArea
                    value={item.comment}
                    onChange={(value: string | null) => {
                      const updated = [...checkpoint];
                      updated[index].comment = value;
                      setCheckpoint(updated);
                    }}
                />
              </td>
            </tr>
        ))}
        </tbody>
      </table>
      <p className="muted mt-2">
        This menu can overwrite changes made by other students.
        <br />
        Use the custom check-in & attendance feature when everyone does their
        own check-ins.
      </p>
      <div className="align-center horizontal gap-3 mt-2">
        <div className="flex-1"></div>
        <button
          type="button"
          className="btn border"
          onClick={() => getGroupCheckpoints()}
        >
          <FontAwesomeIcon icon={faRotateLeft} className="text-gray icon" />
          Undo
        </button>
        <button
          type="submit"
          className="btn border"
          disabled={updateCheckpointApi.loading}
        >
          <FontAwesomeIcon icon={faCheck} className="text-blue icon" />
          {updateCheckpointApi.loading ? (
            <LoadScreen />
          ) : (
            "Submit"
          )}
        </button>
        <button
          type="button"
          className="btn border btn-red"
          onClick={() => deleteCheckpoint()}
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-bg icon" />
          Clear
        </button>
      </div>
    </form>
  );
}
