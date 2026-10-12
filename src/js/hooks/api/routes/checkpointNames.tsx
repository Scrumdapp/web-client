import {
  createProcessor,
  makeApiRequest,
  RequestProcessor,
} from "../apiUtils.ts";

export function getCheckpointNames(): RequestProcessor<
  [groupId: number],
  string[]
> {
  return createProcessor("getCheckpointNames", (groupId: number) => {
    return makeApiRequest("GET", "/groups/{group.id}/checkpoints/names", {
      params: { "{group.id}": groupId },
    });
  });
}

export function updateCheckpointNames(): RequestProcessor<
  [groupId: number, names: string[]],
  string[]
> {
  return createProcessor(
    "updateCheckpointNames",
    (groupId: number, names: string[]) => {
      return makeApiRequest("PUT", "/groups/{group.id}/checkpoints/names", {
        body: { names },
        params: { "{group.id}": groupId },
      });
    },
  );
}
