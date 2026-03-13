import AttendanceDropDownMenu from "./AttendanceDropDownMenu.tsx";
import StarsDropDownMenu from "./StarsDropDownMenu.tsx";

export default function ScrummasterCheckins() {

    return (
        <div className="card vertical g-md">
            <h1>Checkin for <b>[today's date]</b></h1>
                <div>
                    <form action="#" method="POST">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Attendance</th>
                                    <th>Check In</th>
                                    <th>Check Up</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>[Student 1]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><textarea className="write-section h-10 input checkbox-expand-content no-resize" name="comment-2" placeholder="Notes..."></textarea></td>
                                </tr>
                                <tr>
                                    <td>[Student 2]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><textarea className="write-section h-10 input checkbox-expand-content no-resize" name="comment-2" placeholder="Notes..."></textarea></td>
                                </tr>
                                <tr>
                                    <td>[Student 3]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><textarea className="write-section h-10 input checkbox-expand-content no-resize" name="comment-2" placeholder="Notes..."></textarea></td>
                                </tr>
                                <tr>
                                    <td>[Student 4]</td>
                                    <td><AttendanceDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><StarsDropDownMenu /></td>
                                    <td><textarea className="write-section h-10 input checkbox-expand-content no-resize" name="comment-2" placeholder="Notes..."></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            <p className="text-gray text-sm">This menu can overwrite changes made by other students. Use the custom check-in & attendance feature when everyone does their own check-ins.</p>
            <div className="align-center horizontal gap-6">
                <div className="flex-1"></div>
                <a href="#" className="btn border">
                    <span className="icon material-icons-outlined gray">cancel</span>
                    Cancel
                </a>
                <a href="#" className="btn border">
                    <span className="icon material-icons-outlined text-blue">check</span>
                    Submit
                </a>
                <a href="#" className="btn border btn-red">
                    <span className="icon material-icons-outlined text-bg">delete_forever</span>
                    Delete
                </a>
            </div>
        </div>
    )
}