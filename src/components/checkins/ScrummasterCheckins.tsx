import AttendanceDropDownMenu from "./checkincomponents/AttendanceDropDownMenu.tsx";
import StarsDropDownMenu from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";
import {userData} from "../../../msw/handlers/userHandlers.ts";

export default function testtest() {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    return (
        <form method="post" className="card flex-1 mx-auto vertical flex-1 gap-3 w-4/7">
            <h1 className="mb-3">Checkin for <b>{date}</b></h1>
                <table className="checkin-table table-fixed w-full">
                    <thead>
                    <tr  className="">
                        <th className="w-[20%] pr-3 text-left">Name</th>
                        <th className="w-[20%] pr-3 text-left">Attendance</th>
                        <th className="w-[10%] pr-3">Check In</th>
                        <th className="w-[10%] pr-3">Check Up</th>
                        <th className="w-[25%] pr-3 text-right">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td className="truncate name-field pr-3">
                                {user.first_name} {user.last_name}
                            </td>
                            <td className="pr-3"><AttendanceDropDownMenu /></td>
                            <td className="pr-3"><StarsDropDownMenu /></td>
                            <td className="pr-3"><StarsDropDownMenu/></td>
                            <td className="pr-3">
                                <AttendanceTextArea />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            <p className="text-gray text-sm mt-3">
                This menu can overwrite changes made by other students. Use the custom check-in & attendance feature when everyone does their own check-ins.
            </p>
            <div className="align-center horizontal gap-3 mt-3">
                <div className="flex-1"></div>
                <a href="" className="btn border">
                    <span className="icon material-icons-outlined gray">cancel</span>
                    Cancel
                </a>
                <a href="" className="btn border">
                    <span className="icon material-icons-outlined text-blue">check</span>
                    Submit
                </a>
                <a href="" className="btn border btn-red">
                    <span className="icon material-icons-outlined text-bg">delete_forever</span>
                    Delete
                </a>
            </div>
        </form>
    )
}