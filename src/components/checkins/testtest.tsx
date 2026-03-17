import AttendanceDropDownMenu from "./checkincomponents/AttendanceDropDownMenu.tsx";
import StarsDropDownMenu from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";

export default function testtest() {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    return (
        <div className="vertical flex-1 gap-3 w-10/12">
            <div className="card vertical gap-3">
                <h1 className="mb-3 pl-3">Checkin for <b>{date}</b></h1>
                <form method="post" className="vertical flex-1 gap-3">
                    <table className="checkin-table">
                        <thead>
                            <tr>
                                <th className="text-left name-field">Name</th>
                                <th className="text-left">Attendance</th>
                                <th>Check In</th>
                                <th>Check Up</th>
                                <th className="text-right">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="truncate name-field">[Student 1]</td>
                                <td className=""><AttendanceDropDownMenu /></td>
                                <td className=""><StarsDropDownMenu /></td>
                                <td className=""><StarsDropDownMenu/></td>
                                <td className="horizontal justify-between align-center relative w-48 max-w-48">
                                    <div className="absolute checkbox-expand">
                                        <AttendanceTextArea />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <p className="text-gray text-sm mt-3 pl-3">
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
            </div>
        </div>
    )
}