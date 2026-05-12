import {Route, Routes} from "react-router-dom";
import {ErrorScreen} from "../components/generic/ErrorScreen.tsx";
import {ApiError} from "../js/hooks/api/apiError.ts";
import {GroupCheckpointPage} from "../pages/groups/GroupCheckpointPage.tsx";
import {ScrummasterCheckpointPage} from "../pages/groups/ScrummasterCheckpointPage.tsx";

export function GroupRouter() {

    return (
        <Routes>
            <Route index element={<GroupCheckpointPage/>} />
            <Route path="edit" element={<ScrummasterCheckpointPage/>} />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
        </Routes>
    )
}