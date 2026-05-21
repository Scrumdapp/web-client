import { Routes, Route } from "react-router-dom";

import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Groups from "../pages/Groups.tsx";
import {GroupLayout} from "../components/groups/GroupLayout.tsx";
import LoginPage from "../pages/account/LoginPage.tsx";
import DiscordLogin from "../pages/account/DiscordLogin.tsx";
import DiscordLoginReturnPage from "../pages/account/DiscordLoginReturnPage.tsx";
// ^^^ Add new pages here ^^^

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:groupId/*" element={<GroupLayout />}/>
            <Route path="/account" element={<LoginPage />} />
                <Route path="/account/discord" element={<DiscordLogin />} />
                <Route path="/account/discord/auth" element={<DiscordLoginReturnPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}