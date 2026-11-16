import { PropsWithChildren, useCallback, useEffect, useRef } from "react";

import { useGroup } from "../../js/context/group/useGroup";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi";
import { useApi } from "../../js/hooks/api/useApi";
import ErrorPage from "../../pages/ErrorPage";
import { ErrorScreen } from "../../components/generic/ErrorScreen";
import { LoadScreen } from "../../components/generic/LoadScreen";
import { groupUserContext, GroupUsersContextData } from "./groupUserContext";
import { useStompdappSubscription } from "../stomp/useStompdappSubscription";
import { StompdappApi } from "../stomp/stompdappApi";

export function GroupUsersProvider({ children }: PropsWithChildren) {
  const group = useGroup();
  const getGroupUsers = useApi(ScrumdappApi.getGroupUsers());

  const refresh = useCallback(() => {
    return getGroupUsers.runCommand(group.id).then((d) => {
      if (JSON.stringify(ref.current.users) != JSON.stringify(d)) {
        ref.current.users = d;
        ref.current.usersUpdated.emit(d);
      }
      return d;
    });
  }, [group.id]);

  const ref = useRef(new GroupUsersContextData(refresh));

  useStompdappSubscription(StompdappApi.groupUserAdded(group.id), (msg) => {
    refresh()
  })

  useEffect(() => { ref.current.setRefresh(refresh); }, [refresh]);
  useEffect(() => { refresh(); }, [group.id]);

  if (getGroupUsers.error) {
    return getGroupUsers.error?.status === 404 ? (
      <ErrorPage />
    ) : (
      <ErrorScreen error={getGroupUsers.error} />
    );
  }

  if (ref.current.users == null) {
    return <LoadScreen />;
  }

  const Provider = groupUserContext.Provider;
  return <Provider value={ref.current}>{children}</Provider>;
}
