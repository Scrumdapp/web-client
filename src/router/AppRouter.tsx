import {Routes, Route, Navigate} from "react-router-dom";

import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Groups from "../pages/Groups.tsx";
import AcceptInvite from "../pages/AcceptInvite.tsx";
import {GroupLayout} from "../components/groups/GroupLayout.tsx";
// ^^^ Add new pages here ^^^

export default function AppRouter() {
    return (
        <Routes>
            <Route path="" element={<Navigate to="/groups" replace />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:groupId/*" element={<GroupLayout />}/>
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/invites/:inviteId" element={<AcceptInvite />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}