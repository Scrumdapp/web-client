import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";
import {UserProvider} from "./js/context/user/UserProvider.tsx";
import {LoadScreen} from "./components/generic/LoadScreen.tsx";
import {ErrorScreen} from "./components/generic/ErrorScreen.tsx";
import {useApi} from "./js/hooks/api/useApi.ts";
import {ScrumdappApi} from "./js/hooks/api/scrumdappApi.ts";
import {useEffect} from "react";

function App() {

    const getUserCheckins = useApi(ScrumdappApi.getUserCheckins())

    useEffect(() => {

        getUserCheckins.runCommand(1, 1, { start_date: "2026-03-10", end_date: "2026-03-18" }, { "checkin_stars": true, "checkup_stars": true }).then((it) => {
            console.log(it)
        }).catch((it) => {
            console.log(it)
        })

    }, [getUserCheckins.runCommand]);

    return (
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