import { Route, Routes } from "react-router-dom";
import { ErrorScreen } from "../components/generic/ErrorScreen.tsx";
import { ApiError } from "../js/hooks/api/apiError.ts";
import { GroupCheckpointPage } from "../pages/groups/GroupCheckpointPage.tsx";
import { TrendsPage } from "../pages/groups/TrendsPage.tsx";
import { GroupCalendarPage } from "../pages/groups/GroupCalendarPage.tsx";
import { SettingsPage } from "../pages/groups/SettingsPage.tsx";
import { useUser } from "../js/context/user/useUser.ts";
import { hasRole, Role } from "../js/utils/userPermissions.ts";

export function GroupRouter() {

    const user = useUser()

    return (
        <Routes>
            <Route index element={<GroupCheckpointPage />} />
            <Route path="trends" element={<TrendsPage />} />
            <Route path="calendar" element={<GroupCalendarPage />} />
            <Route path="settings" element={hasRole(user, Role.Coach)
                ? <SettingsPage />
                : <ErrorScreen error={new ApiError(403, "Forbidden")} />}
            />
            <Route path="*" element={<ErrorScreen error={new ApiError(404, "Page Not Found")} />} />
        </Routes>
    )
}
