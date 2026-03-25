import { Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage.tsx";
import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import {GroupLayout} from "../components/groups/GroupLayout.tsx";
import Testpage from "../pages/testpage.tsx";
import ScrummasterCheckin from "../components/checkins/ScrummasterCheckins.tsx";

// ^^^ Add new pages here ^^^


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/groups/:groupId" element={<GroupLayout />}/>
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />

            <Route path="/test" element={<Testpage />} />
            <Route path="/scrummastercheckin" element={<ScrummasterCheckin />} />
        </Routes>
    );
}