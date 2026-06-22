import { Route, Routes } from "react-router-dom";
import { ErrorScreen } from "../components/generic/ErrorScreen.tsx";
import { ApiError } from "../js/hooks/api/apiError.ts";
import { GroupCheckpointPage } from "../pages/groups/GroupCheckpointPage.tsx";
import { TrendsPage } from "../pages/groups/TrendsPage.tsx";
import { GroupCalendarPage } from "../pages/groups/GroupCalendarPage.tsx";
import {SettingsPage} from "../pages/groups/SettingsPage.tsx";

export function GroupRouter() {

    return (
        <Routes>
            <Route index element={<GroupCheckpointPage />} />
            <Route path="trends" element={<TrendsPage />} />
            <Route path="calendar" element={<GroupCalendarPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
        </Routes>
    )
}
