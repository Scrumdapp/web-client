import AttendanceDropDownMenu from "./checkincomponents/AttendanceDropDownMenu.tsx";
import StarsDropDownMenu from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";
import {useCallback, useEffect} from "react";
import {useApi} from "../../js/hooks/api/useApi.ts"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";


export default function ScrummasterCheckinsTable() {


    const getGroupCheckins = useApi(ScrumdappApi.getGroupCheckinsWithUsers())

    const current = new Date();
    const date = `${current.getDate()} / ${current.getMonth() + 1} / ${current.getFullYear()}`;

    const getCheckins = useCallback(() => {
        return getGroupCheckins.runCommand(1, toScrumdappDate(current), {checkin_stars:true, checkup_stars:true, presence:true, presence_comment:true})
    }, [getGroupCheckins.runCommand])

    useEffect(() => {
        getCheckins()
    }, [getCheckins]);

    if (getGroupCheckins.loading || getGroupCheckins.data == null) {
        return (
            <LoadScreen />
        )
    }
    const checkins = getGroupCheckins.data

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                const groupId = 1;

                const payload = checkins.map(c => ({
                    user_id: c.user_id,
                    attendance: c.presence,
                    check_in: c.checkin_stars,
                    check_up: c.checkup_stars,
                    notes: c.presence_comment,
                }));
            }}
            method="post" className="card flex-1 mx-auto vertical gap-3 w-4/7">
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
                    {checkins.map((checkin) => (
                        <tr key={checkin.user_id}>
                            <td className="truncate name-field pr-2">
                                {checkin.first_name} {checkin.last_name}
                            </td>
                            <td className="pr-2"><AttendanceDropDownMenu /></td>
                            <td className="pr-2"><StarsDropDownMenu /></td>
                            <td className="pr-2"><StarsDropDownMenu/></td>
                            <td className="pr-2">
                                <AttendanceTextArea />
                            </td>
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
                    <span className="icon material-icons-outlined text-gray">cancel</span>
                    Undo
                </button>
                <button type="button" className="btn border" onClick={() => {}}>
                    <span className="icon material-icons-outlined text-blue">check</span>
                    Submit
                </button>
                <button
                    type="button" className="btn border btn-red" >
                    <span className="icon material-icons-outlined text-bg">delete_forever</span>
                    Clear
                </button>
            </div>
        </form>
    )
}