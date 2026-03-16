function Checkin() {
    return (
        <main className="w-6/10 bg-gray-800 border h-fit p-2">
            <table className="text-yellow-300 w-full table-fixed">
                <thead>
                <tr>
                    <th className="py-3">Name</th>
                    <th className="py-3">Attendance</th>
                    <th className="py-3">Check-in</th>
                    <th className="py-3">Check-up</th>
                    <th className="py-3">More Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="py-3"> [student 1] </td>
                    <td> [present] </td>
                    <td> [3 stars]</td>
                    <td> [3 stars]</td>
                    <td className="flex justify-center">
                        <button className="btn btn-secondary border">More</button>
                    </td>
                </tr>
                <tr>
                    <td className="py-3"> [student 2] </td>
                    <td> [present] </td>
                    <td> [3 stars]</td>
                    <td> [3 stars]</td>
                    <td className="flex justify-center">
                        <button className="btn btn-secondary border">More</button>
                    </td>
                </tr>
                <tr>
                    <td className="py-3"> [student 3] </td>
                    <td> [present] </td>
                    <td> [3 stars]</td>
                    <td> [3 stars]</td>
                    <td className="flex justify-center">
                        <button className="btn btn-secondary border">More</button>
                    </td>
                </tr>
                <tr>
                    <td className="py-3"> [student 4] </td>
                    <td> [present] </td>
                    <td> [3 stars]</td>
                    <td> [3 stars]</td>
                    <td className="flex justify-center">
                        <button className="btn btn-secondary border">More</button>
                    </td>

                </tr>
                <tr>
                    <td className="py-3"> [student 5] </td>
                    <td> [present] </td>
                    <td> [3 stars]</td>
                    <td> [3 stars]</td>
                    <td className="flex justify-center">
                        <button className="btn btn-secondary border">More</button>
                    </td>
                </tr>
                <tr>
                    <td className="py-3"> [student 6] </td>
                    <td> [present] </td>
                    <td> [3 stars]</td>
                    <td> [3 stars]</td>
                    <td className="flex justify-center">
                        <button className="btn btn-secondary border">More</button>
                    </td>
                </tr>


                </tbody>
            </table>
        </main>
    );
}

export default Checkin;
