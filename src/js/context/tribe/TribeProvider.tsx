import { useApi } from "../../hooks/api/useApi.ts";
import { ScrumdappApi } from "../../hooks/api/scrumdappApi.ts";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { TribeContextState, tribeContext } from "./tribeContext.ts";
import { LoadScreen } from "../../../components/generic/LoadScreen.tsx";
import { ErrorScreen } from "../../../components/generic/ErrorScreen.tsx";
import ErrorPage from "../../../pages/ErrorPage.tsx";

export function TribeProvider({
  tribeId,
  children,
}: PropsWithChildren<{ tribeId: number }>) {
  const getTribeData = useApi(ScrumdappApi.getTribe());
  const [tribeState, setTribeState] = useState<TribeContextState | null>(null);

  const runCommand = useCallback(() => {
    getTribeData.runCommand(tribeId).then((it) => {
      const state = new TribeContextState();
      state.tribe = it;
      state.refresh = runCommand;
      setTribeState(state);
    });
  }, [getTribeData.runCommand, tribeId]);

  useEffect(() => {
    runCommand();
  }, [runCommand]);

  if (getTribeData.error) {
    return getTribeData.error?.status === 404 ? (
      <ErrorPage />
    ) : (
      <ErrorScreen error={getTribeData.error} />
    );
  }

  if (getTribeData.loading || getTribeData.data == null) {
    return <LoadScreen />;
  }

  const Provider = tribeContext.Provider;
  return <Provider value={tribeState}>{children}</Provider>;
}
