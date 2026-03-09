import { Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Test from "../pages/testpage";

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