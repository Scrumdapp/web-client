import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Test from "./pages/Test";
import About from "./pages/About";
import MainPage from "./pages/MainPage";
import Privacy from "./pages/Privacy";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<Privacy />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;