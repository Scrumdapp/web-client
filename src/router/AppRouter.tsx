import { Routes, Route } from "react-router-dom";

import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import {GroupLayout} from "../components/groups/GroupLayout.tsx";
// ^^^ Add new pages here ^^^

import Test from "../pages/test.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/groups/:groupId/*" element={<GroupLayout />}/>
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
}