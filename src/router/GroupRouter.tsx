import {Route, Routes} from "react-router-dom";
import {ErrorScreen} from "../components/generic/ErrorScreen.tsx";
import {ApiError} from "../js/hooks/api/apiError.ts";
import {GroupCheckinPage} from "../pages/groups/GroupCheckinPage.tsx";
import {ScrummasterCheckinPage} from "../pages/groups/ScrummasterCheckinPage.tsx";

export function GroupRouter() {

    return (
        <Routes>
            <Route index element={<GroupCheckinPage/>} />
            <Route path="edit" element={<ScrummasterCheckinPage/>} />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
        </Routes>
    )
}