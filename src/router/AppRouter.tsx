import { Routes, Route } from "react-router-dom";

import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import {GroupLayout} from "../components/groups/GroupLayout.tsx";
import Test from "../pages/Test.tsx";
// ^^^ Add new pages here ^^^

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/groups/:groupId/*" element={<GroupLayout />}/>
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}