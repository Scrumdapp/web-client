import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";
import {UserProvider} from "./js/context/user/UserProvider.tsx";
import {LoadScreen} from "./components/generic/LoadScreen.tsx";

function App() {
    return (
        <BrowserRouter>
            <UserProvider loading={<LoadScreen/>}>
                <Layout>
                    <AppRouter />
                </Layout>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;