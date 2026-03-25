import {Route, Routes} from "react-router-dom";
import {GroupTestPage} from "../pages/groups/GroupTestPage.tsx";
import {ErrorScreen} from "../components/generic/ErrorScreen.tsx";
import {ApiError} from "../js/hooks/api/apiError.ts";

export function GroupRouter() {

    return (
        <Routes>
            <Route index element={<GroupTestPage/>} />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
        </Routes>
    )
}