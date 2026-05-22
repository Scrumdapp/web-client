import { BrowserRouter, useNavigate } from "react-router-dom";
import {useState} from "react";
import Layout from "./components/layout/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";
import {UserProvider} from "./js/context/user/UserProvider.tsx";
import {LoadScreen} from "./components/generic/LoadScreen.tsx";
import {ErrorScreen} from "./components/generic/ErrorScreen.tsx";

import DiscordLogin from "./pages/account/DiscordLogin.tsx";

function getCookie(name: string): string | null {
    return (
        document.cookie
            .split("; ")
            .find((r) => r.startsWith(name + "="))
            ?.split("=")[1] ?? null
    );
}

function AppContent() {
    const [granted, setGranted] = useState(() => getCookie("site_access") === "granted");
    const navigate = useNavigate();

    function handleGranted() {
        setGranted(true);
        navigate("/groups");
    }

    if (!granted) return <DiscordLogin onGranted={handleGranted} />;
    return (
        <UserProvider
            loading={<LoadScreen />}
            error={(e) => <ErrorScreen error={e} />}
        >
            <Layout>
                <AppRouter />
            </Layout>
        </UserProvider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;