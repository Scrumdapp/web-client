import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";
import {UserProvider} from "./js/context/user/UserProvider.tsx";
import {LoadScreen} from "./components/generic/LoadScreen.tsx";
import {ErrorScreen} from "./components/generic/ErrorScreen.tsx";

import {useLoginCookie} from "./js/hooks/useLoginCookie.ts";
import DiscordLogin from "./pages/account/DiscordLogin.tsx";

function App() {
    const { granted, accept } = useLoginCookie();
    if (!granted) return <DiscordLogin onAccept={accept} />;
    else return (
        <BrowserRouter>
            <UserProvider
                loading={<LoadScreen/>}
                error={(e) => <ErrorScreen error={e}/>}
            >
                <Layout>
                    <AppRouter />
                </Layout>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;