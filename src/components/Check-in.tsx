function Checkin() {
    return (
        <main className="w-6/10 h-5/10 bg-gray-800 border">
            <table className="text-yellow-300 w-full table-fixed">
                <thead>
                <tr>
                    <th className="py-4">Naam</th>
                    <th className="py-4">Presentie</th>
                    <th className="py-4">Check-in</th>
                    <th className="py-4">Check-up</th>
                    <th className="py-4">Acties</th>
                </tr>
                </thead>
                <tbody>
                {/* Your table rows go here */}
                </tbody>
            </table>
        </main>
    );
}

export default Checkin;
