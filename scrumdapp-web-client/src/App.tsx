import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AppRouter from "./router/AppRouter";
import "./css/Stylesheet.css";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <AppRouter />
            </Layout>
        </BrowserRouter>
    );
}

export default App;