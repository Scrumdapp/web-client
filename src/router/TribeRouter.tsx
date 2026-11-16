import { Route, Routes } from "react-router-dom";
import { ErrorScreen } from "../components/generic/ErrorScreen.tsx";
import { ApiError } from "../js/hooks/api/apiError.ts";
import { TribeCheckpointPageWrapper } from "../pages/tribes/TribeCheckpointPageWrapper.tsx";

export function TribeRouter() {
  return (
    <Routes>
      <Route index element={<TribeCheckpointPageWrapper />} />
      {/*<Route path="calendar" element={<GroupCalendarPage />} />

      <Route path="trends" element={<TrendsPage />} />
      <Route path="group-management" element={<SettingsPage />} />

      <Route path="settings" element={<SettingsPage />} />*/}
      <Route
        path="*"
        element={
          <ErrorScreen
            error={
              new ApiError(404, {
                status: 404,
                code: "PAGE_NOT_FOUND",
                titleTranslationKey: "errors.generic.notFound.title",
                descriptionTranslationKey:
                  "errors.generic.notFound.description",
              })
            }
          />
        }
      />
    </Routes>
  );
}
