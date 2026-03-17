import { Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage.tsx";
import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import ScrummasterCheckins  from "../components/checkins/ScrummasterCheckins.tsx";
import Testtest from "../components/checkins/testtest.tsx";

// ^^^ Add new pages here ^^^


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/test" element={<ScrummasterCheckins />} />
            <Route path="/testtest" element={<Testtest />} />

        </Routes>
    );
}