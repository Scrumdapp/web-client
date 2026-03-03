import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<Footer />} />
                <Route path="/1" element={<Header />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;