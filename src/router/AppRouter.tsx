import { Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage.tsx";
import About from "../pages/About.tsx";
import Privacy from "../pages/Privacy.tsx";
import Test from "../pages/testpage.tsx";

// ^^^ Add new pages here ^^^


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
}