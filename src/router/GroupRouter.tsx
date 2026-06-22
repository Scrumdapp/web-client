import { Route, Routes, useParams } from "react-router-dom";
import { ErrorScreen } from "../components/generic/ErrorScreen.tsx";
import { ApiError } from "../js/hooks/api/apiError.ts";
import { GroupCheckpointPage } from "../pages/groups/GroupCheckpointPage.tsx";
import Invites from "../components/groups/Invites/InviteComponent.tsx";
import { TrendsPage } from "../pages/groups/TrendsPage.tsx";
import { GroupCalendarPage } from "../pages/groups/GroupCalendarPage.tsx";

export function GroupRouter() {
    const { groupId } = useParams();

    return (
        <Routes>
            <Route index element={<GroupCheckpointPage />} />
            <Route path="trends" element={<TrendsPage />} />
            <Route path="calendar" element={<GroupCalendarPage />} />
            <Route path="settings" element={<Invites groupId={Number(groupId)} />} />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
        </Routes>
    )
}
