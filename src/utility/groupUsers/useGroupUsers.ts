import { useContext } from "react"
import { groupUserContext } from "./groupUserContext"
import { useEventChannel } from "../../js/events/useEventChannel"
import { useUpdate } from "../../js/hooks/useUpdate"


export function useGroupUsers() {
  const ctx = useContext(groupUserContext)!
  const update = useUpdate()

  useEventChannel(ctx.usersUpdated, () => {
    update()
  }, [ctx])

  return ctx.users
}
