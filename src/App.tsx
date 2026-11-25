import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import AppRouter from "./router/AppRouter.tsx";
import { UserProvider } from "./js/context/user/UserProvider.tsx";
import { LoadScreen } from "./components/generic/LoadScreen.tsx";
import { ErrorScreen } from "./components/generic/ErrorScreen.tsx";
import { StompdappProvider } from "./utility/stomp/stompdappProvider.tsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider
        loading={<LoadScreen />}
        error={(e) => <ErrorScreen error={e} />}
      >
        <StompdappProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </StompdappProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
