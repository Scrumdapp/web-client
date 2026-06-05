import {Route, Routes, useParams} from "react-router-dom";
import {ErrorScreen} from "../components/generic/ErrorScreen.tsx";
import {ApiError} from "../js/hooks/api/apiError.ts";
import {GroupCheckpointPage} from "../pages/groups/GroupCheckpointPage.tsx";
import Settings from "../components/generic/Settings.tsx";
import {TrendsPage} from "../pages/groups/TrendsPage.tsx";

export function GroupRouter() {
    const { groupId } = useParams();

    return (
        <Routes>
            <Route index element={<GroupCheckpointPage/>} />
            <Route path="trends" element={<TrendsPage/>} />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
            <Route path="/settings" element={<Settings groupId={Number(groupId)}/>} />
        </Routes>
    )
}