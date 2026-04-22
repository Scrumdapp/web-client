import { AttendanceDropDownMenu } from "./checkincomponents/AttendanceDropDownMenu.tsx";
import { StarsDropDownMenu } from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import {
  GroupCheckinsUpdate,
  UpdateGroupCheckin,
} from "../../js/models/checkin.ts";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAttendanceColor,
  getformatPresence,
} from "../../js/utils/colorUtils.ts";

type EditableCheckin = UpdateGroupCheckin & {
  user_id: number;
  first_name: string;
  last_name: string;
};

export function ScrummasterCheckinsTable({
  groupId,
  date,
  sessionId,
}: {
  groupId: number;
  date: string;
  sessionId?: number;
}) {
  const getGroupCheckins = useApi(ScrumdappApi.getGroupCheckinsWithUsers());
  const updateCheckinsApi = useApi(ScrumdappApi.updateGroupCheckins());
  const updateCheckpointApi = useApi(ScrumdappApi.updateGroupCheckpoint());
  const getGroupUsers = useApi(ScrumdappApi.getGroupUsers());
  const getCheckpointsBySession = useApi(
    ScrumdappApi.getGroupCheckpointsBySession(),
  );

  const [checkins, setCheckins] = useState<EditableCheckin[]>([]);

  const getCheckins = useCallback(() => {
    if (sessionId !== undefined) {
      return Promise.all([
        getGroupUsers.runCommand(groupId),
        getCheckpointsBySession.runCommand(groupId, sessionId),
      ]).then(([users, checkpoints]) => {
        setCheckins(
          users.map((user) => {
            const checkpoint = checkpoints.find(
              (it) => it.groupUser === user.user_id,
            );
            return {
              user_id: user.user_id,
              first_name: user.first_name,
              last_name: user.last_name,
              presence: checkpoint?.presence ?? null,
              presence_comment: checkpoint?.comment ?? null,
              checkin_stars: checkpoint?.stars ?? null,
              checkup_stars: null,
            } as EditableCheckin;
          }),
        );
      });
    }

    return getGroupCheckins.runCommand(groupId, date, {
      checkin_stars: true,
      checkup_stars: true,
      presence: true,
      presence_comment: true,
    });
  }, [
    getGroupCheckins.runCommand,
    getGroupUsers.runCommand,
    getCheckpointsBySession.runCommand,
    groupId,
    date,
    sessionId,
  ]);

  const deleteCheckins = useCallback(() => {
    return getGroupCheckins.runCommand(1, date, {
      checkin_stars: false,
      checkup_stars: false,
      presence: false,
      presence_comment: false,
    });
  }, [getGroupCheckins.runCommand]);

  const navigate = useNavigate();

  useEffect(() => {
    getCheckins();
  }, [getCheckins]);

  useEffect(() => {
    if (sessionId !== undefined) return;
    if (getGroupCheckins.data) {
      setCheckins(
        getGroupCheckins.data.map((c) => ({
          user_id: c.user_id,
          first_name: c.first_name,
          last_name: c.last_name,
          presence: c.presence,
          presence_comment: c.presence_comment,
          checkin_stars: c.checkin_stars,
          checkup_stars: c.checkup_stars,
        })),
      );
    }
  }, [getGroupCheckins.data, sessionId]);

  if (
    sessionId === undefined &&
    (getGroupCheckins.loading || getGroupCheckins.data == null)
  ) {
    return <LoadScreen />;
  }

  if (
    sessionId !== undefined &&
    (getGroupUsers.loading || getCheckpointsBySession.loading)
  ) {
    return <LoadScreen />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (updateCheckinsApi.loading) return;

        if (sessionId !== undefined) {
          const mappedUsers = checkins.map((it) => ({
            userId: it.user_id,
            comment: it.presence_comment ?? null,
            stars: it.checkin_stars ?? null,
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

        const mappedUsers: GroupCheckinsUpdate[] = checkins.map(
          (it) =>
            ({
              user_id: it.user_id,
              presence: it.presence,
              presence_comment: it.presence_comment,
              checkin_stars: it.checkin_stars,
              checkup_stars: it.checkup_stars,
            }) as GroupCheckinsUpdate,
        );

        updateCheckinsApi.runCommand(1, date, mappedUsers).then(() => {
          navigate(`/groups/${groupId}?date=${date}`);
        });
      }}
      className={`card flex vertical gap-3 ${updateCheckinsApi.loading || updateCheckpointApi.loading ? "pointer-events-none opacity-70" : ""}`}
    >
      <h2 className="mb-2">
        Checkpoint for <b>{toScrumdappDate(new Date())}</b>
      </h2>
      <table className="checkin-table table-fixed w-full">
        <thead>
          <tr className="">
            <th className="w-1/5 pr-2 text-left">Name</th>
            <th className="w-1/5 pr-2 text-left">Attendance</th>
            <th className="w-1/10 pr-2">Checkpoint 1</th>
            <th className="w-1/10 pr-2">Checkpoint 2</th>
            <th className="w-1/4 pr-2 text-right">Notes</th>
          </tr>
        </thead>
        <tbody>
          {checkins.map((checkin, index) => (
            <tr key={checkin.user_id}>
              <td className="truncate name-field pr-2">
                {checkin.first_name} {checkin.last_name}
              </td>
              <td className="pr-2">
                {sessionId !== undefined ? (
                  <span
                    className={getAttendanceColor(
                      getformatPresence(
                        checkin.presence ? String(checkin.presence) : "---",
                      ),
                    )}
                  >
                    {getformatPresence(
                      checkin.presence ? String(checkin.presence) : "---",
                    )}
                  </span>
                ) : (
                  <AttendanceDropDownMenu
                    value={checkin.presence}
                    onChange={(value: string | null) => {
                      const updated = [...checkins];
                      updated[index].presence = value;
                      setCheckins(updated);
                    }}
                  />
                )}
              </td>
              <td className="pr-2">
                <StarsDropDownMenu
                  value={checkin.checkin_stars}
                  onChange={(value: number | null) => {
                    const updated = [...checkins];
                    updated[index].checkin_stars = value;
                    setCheckins(updated);
                  }}
                />
              </td>
              <td className="pr-2">
                {sessionId !== undefined ? (
                  <span className="text-gray">---</span>
                ) : (
                  <StarsDropDownMenu
                    value={checkin.checkup_stars}
                    onChange={(value: number | null) => {
                      const updated = [...checkins];
                      updated[index].checkup_stars = value;
                      setCheckins(updated);
                    }}
                  />
                )}
              </td>
              <td className="pr-2">
                <AttendanceTextArea
                  value={checkin.presence_comment}
                  onChange={(value: string | null) => {
                    const updated = [...checkins];
                    updated[index].presence_comment = value;
                    setCheckins(updated);
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
          onClick={() => getCheckins()}
        >
          <FontAwesomeIcon icon={faRotateLeft} className="text-gray icon" />
          Undo
        </button>
        <button
          type="submit"
          className="btn border"
          disabled={updateCheckinsApi.loading || updateCheckpointApi.loading}
        >
          <FontAwesomeIcon icon={faCheck} className="text-blue icon" />
          {updateCheckinsApi.loading || updateCheckpointApi.loading ? (
            <LoadScreen />
          ) : (
            "Submit"
          )}
        </button>
        <button
          type="button"
          className="btn border btn-red"
          onClick={() => deleteCheckins()}
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-bg icon" />
          Clear
        </button>
      </div>
    </form>
  );
}
