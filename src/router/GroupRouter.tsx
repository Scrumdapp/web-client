import {Route, Routes} from "react-router-dom";
import {GroupTestPage} from "../pages/groups/GroupTestPage.tsx";

export function GroupRouter() {

    return (
        <Routes>
            <Route index element={<GroupTestPage/>} />
        </Routes>
    )
}