import { useContext } from "react";
import { groupUserContext } from "./groupUserContext";
import { useEventChannel } from "../../js/events/useEventChannel";
import { useUpdate } from "../../js/hooks/useUpdate";

export function useGroupUsers({
  ignoreGhosts,
}: { ignoreGhosts?: boolean } = {}) {
  const ctx = useContext(groupUserContext)!;
  const update = useUpdate();

  useEventChannel(
    ctx.usersUpdated,
    () => {
      update();
    },
    [ctx],
  );

  if (ignoreGhosts === true) {
    return ctx.users!.filter((it) => !it.is_ghost);
  } else {
    return ctx.users!;
  }
}
