import AttendanceDropDownMenu from "./checkincomponents/AttendanceDropDownMenu.tsx";
import StarsDropDownMenu from "./checkincomponents/StarsDropDownMenu.tsx";
import AttendanceTextArea from "./checkincomponents/AttendanceTextArea.tsx";

export default function ScrummasterCheckins() {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    return (
        <div className="card vertical g-md max-w-7/10">
            <h1>Checkin for <b>{date}</b></h1>
                <div>
                    <form action="#" method="POST">
                        <table className="table">
                            <thead>
                                <tr className="px-3">
                                    <th className="text-left pl-3">Name</th>
                                    <th>Attendance</th>
                                    <th>Check In</th>
                                    <th>Check Up</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="pl-3">[Student 1]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><AttendanceTextArea /></td>
                                </tr>
                                <tr>
                                    <td className="pl-3">[Student 2]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><AttendanceTextArea /></td>
                                </tr>
                                <tr>
                                    <td className="pl-3">[Student 3]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><AttendanceTextArea /></td>
                                </tr>
                                <tr>
                                    <td className="pl-3">[Student 4]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><AttendanceTextArea /></td>
                                </tr>
                                <tr>
                                    <td className="pl-3">[Student 5]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><AttendanceTextArea /></td>
                                </tr>
                                <tr>
                                    <td className="pl-3">[Student 6]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><AttendanceTextArea /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            <p className="text-gray text-sm mt-2">
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
    )
}