import AttendanceDropDownMenu from "./checkincomponents/AttendanceDropDownMenu.tsx";
import {StarsDropDownMenu} from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";
import {useCallback, useEffect, useState} from "react";
import {useApi} from "../../js/hooks/api/useApi.ts"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";
import {UpdateGroupCheckin} from "../../js/models/checkin.ts";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faRotateLeft, faTrashCan} from "@fortawesome/free-solid-svg-icons";


type EditableCheckin = UpdateGroupCheckin & {
    user_id: number;
    first_name: string;
    last_name: string;
};

export default function ScrummasterCheckinsTable() {

    const getGroupCheckins = useApi(ScrumdappApi.getGroupCheckinsWithUsers());
    const updateCheckinsApi = useApi(ScrumdappApi.updateGroupCheckins());


    const [checkins, setCheckins] = useState<EditableCheckin[]>([]);

    const getCheckins = useCallback(() => {
        return getGroupCheckins.runCommand(
            1,
            toScrumdappDate(current),
            { checkin_stars: true, checkup_stars: true, presence: true, presence_comment: true }
        );
    }, [getGroupCheckins]);

    const current = new Date();
    const date = `${current.getDate()} / ${current.getMonth() + 1} / ${current.getFullYear()}`;

    const navigate = useNavigate();

    useEffect(() => {
        void getGroupCheckins.runCommand(
            1,
            toScrumdappDate(current),
            { checkin_stars: true, checkup_stars: true, presence: true, presence_comment: true }
        );
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

                updateCheckinsApi
                    .runCommand(1, toScrumdappDate(current), checkins)
                    .then(() => {
                        navigate("/test");
                    });
            }}
            className="card flex-1 mx-auto vertical gap-3 w-4/7">
            <h1 className="mb-2">Checkin for <b>{date}</b></h1>
                <table className="checkin-table table-fixed w-full">
                    <thead>
                    <tr  className="">
                        <th className="w-[20%] pr-2 text-left">Name</th>
                        <th className="w-[20%] pr-2 text-left">Attendance</th>
                        <th className="w-[10%] pr-2">Check In</th>
                        <th className="w-[10%] pr-2">Check Up</th>
                        <th className="w-[25%] pr-2 text-right">Notes</th>
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
                                onChange={(value: string) => {
                                    const updated = [...checkins];
                                    updated[index].presence = value;
                                    setCheckins(updated);
                                }}
                            /></td>
                            <td className="pr-2"><StarsDropDownMenu
                                value={checkin.checkin_stars}
                                onChange={(value: number) => {
                                    const updated = [...checkins];
                                    updated[index].checkin_stars = number;
                                    setCheckins(updated);
                                }}
                            /></td>
                            <td className="pr-2"><StarsDropDownMenu
                                value={checkin.checkup_stars}
                                onChange={(value: number) => {
                                    const updated = [...checkins];
                                    updated[index].checkup_stars = number;
                                    setCheckins(updated);
                                }}
                            /></td>
                            <td className="pr-2"><AttendanceTextArea
                                value={checkin.presence_comment}
                                onChange={(value: string) => {
                                    const updated = [...checkins];
                                    updated[index].presence_comment = string;
                                    setCheckins(updated);
                                }}
                            /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            <p className="text-gray text-sm mt-2">
                This menu can overwrite changes made by other students.<br/>
                Use the custom check-in & attendance feature when everyone does their own check-ins.
            </p>
            <div className="align-center horizontal gap-3 mt-2">
                <div className="flex-1"></div>
                <button type="button" className="btn border" onClick={() => getCheckins()}>
                    <FontAwesomeIcon icon={faRotateLeft} className="text-gray icon" />
                    Undo
                </button>
                <a href="/test">
                <button type="button" className="btn border" onClick={() => {}}>
                    <FontAwesomeIcon icon={faCheck} className="text-blue icon" />
                    Submit
                </button>
                </a>
                <button
                    type="button" className="btn border btn-red" >
                    <FontAwesomeIcon icon={faTrashCan} className="text-bg icon" />
                    Clear
                </button>
            </div>
        </form>
    )
}