import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";
import {UserProvider} from "./js/context/user/UserProvider.tsx";
import {LoadScreen} from "./components/generic/LoadScreen.tsx";
import {ErrorScreen} from "./components/generic/ErrorScreen.tsx";
import LoginPage from "./pages/account/LoginPage.tsx";
import {useUserState} from "./js/context/user/useUser.ts";

function AuthorizedAppContent() {
    const userState = useUserState()
    const navigate = useNavigate();

    if (userState.user == null) {
        // Hacky! Timeout fixes issue of navigation not working here.
        setTimeout(() => navigate("/login"), 1)
        return null
    }

    return (
        <Layout>
            <AppRouter />
        </Layout>
    );
}

function App() {
    return (
        <BrowserRouter>
            <UserProvider loading={<LoadScreen />} error={(e) => <ErrorScreen error={e} />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<AuthorizedAppContent />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;