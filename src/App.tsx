import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";

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