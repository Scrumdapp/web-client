import {AttendanceDropDownMenu} from "./checkincomponents/AttendanceDropDownMenu.tsx";
import {StarsDropDownMenu} from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";
import {useCallback, useEffect, useState} from "react";
import {useApi} from "../../js/hooks/api/useApi.ts"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";
import {GroupCheckinsUpdate, UpdateGroupCheckin} from "../../js/models/checkin.ts";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faRotateLeft, faTrashCan} from "@fortawesome/free-solid-svg-icons";


type EditableCheckin = UpdateGroupCheckin & {
    user_id: number;
    first_name: string;
    last_name: string;
};

export function ScrummasterCheckinsTable({ groupId, date }: { groupId: number, date : string }) {

    const getGroupCheckins = useApi(ScrumdappApi.getGroupCheckinsWithUsers());
    const updateCheckinsApi = useApi(ScrumdappApi.updateGroupCheckins());


    const [checkins, setCheckins] = useState<EditableCheckin[]>([]);

    const getCheckins = useCallback(() => {
        return getGroupCheckins.runCommand(
            groupId,
            date,
            { checkin_stars: true, checkup_stars: true, presence: true, presence_comment: true }
        );
    }, [getGroupCheckins.runCommand]);

    const deleteCheckins = useCallback(() => {
        return getGroupCheckins.runCommand(
            1,
            date,
            { checkin_stars: false, checkup_stars: false, presence: false, presence_comment: false }
        );
    }, [getGroupCheckins.runCommand]);

    const navigate = useNavigate();

    useEffect(() => {
        getCheckins()
    }, []);

    useEffect(() => {
        if (getGroupCheckins.data) {
            setCheckins(getGroupCheckins.data.map(c => ({
                user_id: c.user_id,
                first_name: c.first_name,
                last_name: c.last_name,
                presence: c.presence,
                presence_comment: c.presence_comment,
                checkin_stars: c.checkin_stars,
                checkup_stars: c.checkup_stars
            })));
        }
    }, [getGroupCheckins.data]);

    if (getGroupCheckins.loading || getGroupCheckins.data == null) {
        return <LoadScreen />;
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (updateCheckinsApi.loading) return;

                const mappedUsers: GroupCheckinsUpdate[] = checkins.map(it => ({
                    user_id: it.user_id,
                    presence: it.presence,
                    presence_comment: it.presence_comment,
                    checkin_stars: it.checkin_stars,
                    checkup_stars: it.checkup_stars
                } as GroupCheckinsUpdate))

                updateCheckinsApi
                    .runCommand(1, date, mappedUsers)
                    .then(() => {
                        navigate(`/groups/${groupId}?date=${date}`);
                    });
            }}
            className={`card flex vertical gap-3 ${updateCheckinsApi.loading ? "pointer-events-none opacity-70" : ""}`}>
            <h2 className="mb-2">Checkpoint for <b>{toScrumdappDate(new Date())}</b></h2>
                <table className="checkin-table table-fixed w-full">
                    <thead>
                    <tr  className="">
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
                            <td className="pr-2"><AttendanceDropDownMenu
                                value={checkin.presence}
                                onChange={(value: string | null) => {
                                    const updated = [...checkins];
                                    updated[index].presence = value;
                                    setCheckins(updated);
                                }}
                            /></td>
                            <td className="pr-2"><StarsDropDownMenu
                                value={checkin.checkin_stars}
                                onChange={(value: number | null) => {
                                    const updated = [...checkins];
                                    updated[index].checkin_stars = value;
                                    setCheckins(updated);
                                }}
                            /></td>
                            <td className="pr-2"><StarsDropDownMenu
                                value={checkin.checkup_stars}
                                onChange={(value: number | null) => {
                                    const updated = [...checkins];
                                    updated[index].checkup_stars = value;
                                    setCheckins(updated);
                                }}
                            /></td>
                            <td className="pr-2"><AttendanceTextArea
                                value={checkin.presence_comment}
                                onChange={(value: string | null) => {
                                    const updated = [...checkins];
                                    updated[index].presence_comment = value;
                                    setCheckins(updated);
                                }}
                            /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            <p className="muted mt-2">
                This menu can overwrite changes made by other students.<br/>
                Use the custom check-in & attendance feature when everyone does their own check-ins.
            </p>
            <div className="align-center horizontal gap-3 mt-2">
                <div className="flex-1"></div>
                <button type="button" className="btn border" onClick={() => getCheckins()}>
                    <FontAwesomeIcon icon={faRotateLeft} className="text-gray icon" />
                    Undo
                </button>
                <button
                    type="submit"
                    className="btn border"
                    disabled={updateCheckinsApi.loading}
                >
                    <FontAwesomeIcon icon={faCheck} className="text-blue icon" />
                    {updateCheckinsApi.loading ? <LoadScreen /> : "Submit"}
                </button>
                <button
                    type="button" className="btn border btn-red" onClick={() => deleteCheckins()}>
                    <FontAwesomeIcon icon={faTrashCan} className="text-bg icon" />
                    Clear
                </button>
            </div>
        </form>
    )
}