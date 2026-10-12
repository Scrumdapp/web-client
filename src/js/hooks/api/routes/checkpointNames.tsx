import { createProcessor, makeApiRequest } from "../apiUtils.ts";

export function getCheckpointNames() {
  return createProcessor("getCheckpointNames", (groupId: number) => {
    return makeApiRequest<string[]>(
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
    (groupId: number, names: string[]) => {
      return makeApiRequest<string[]>(
        "PUT",
        "/groups/{group.id}/checkpoints/names",
        {
          body: { names },
          params: { "{group.id}": groupId },
        },
      );
    },
  );
}
