import { useCallback } from "react";
import { GroupCheckpoint } from "../../js/models/checkpoint";

export type SessionCheckpointRow = GroupCheckpoint & {
  first_name: string;
  last_name: string;
};

export function useCreateCheckpointUserMapper(): (
  checkpoints: GroupCheckpoint[],
) => SessionCheckpointRow[] {
  const users = useGroupUsers({ ignoreGhosts: true });

  const cb = useCallback(
    (checkpoints: GroupCheckpoint[]) =>
      checkpoints.map((it) => {
        const user = users.find((u) => u.user_id == it.groupUser);
        return {
          ...it,
          first_name: user?.first_name,
          last_name: user?.last_name,
        } as SessionCheckpointRow;
      }),
    [JSON.stringify(users)],
  );

  return cb;
}
