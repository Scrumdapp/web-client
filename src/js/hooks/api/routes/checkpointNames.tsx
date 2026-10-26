import { CheckpointNames } from "../../../models/checkpoint.ts";
import { createProcessor, makeApiRequest } from "../apiUtils.ts";

export function getCheckpointNames() {
  return createProcessor("getCheckpointNames", (groupId: number) => {
    return makeApiRequest<CheckpointNames>(
      "GET",
      "/groups/{group.id}/checkpoints/names",
      {
        params: { "{group.id}": groupId },
      },
    );
  });
}

export function updateCheckpointNames() {
  return createProcessor(
    "updateCheckpointNames",
    (groupId: number, checkpointNames: string[]) => {
      return makeApiRequest<CheckpointNames>(
        "PUT",
        "/groups/{group.id}/checkpoints/names",
        {
          body: { checkpointNames },
          params: { "{group.id}": groupId },
        },
      );
    },
  );
}
