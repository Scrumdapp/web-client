import {
  createProcessor,
  makeApiRequest,
  invalidateCache,
} from "../apiUtils.ts";
import {
  CreateGroup,
  Group,
  PartialGroup,
  PatchGroup,
} from "../../../models/group.ts";

export function getGroups() {
  return createProcessor("getGroups", () => {
    return makeApiRequest<PartialGroup[]>("GET", "/groups", {
      cache: { enabled: true, staleTime: 1000 * 60 * 5 },
    });
  });
}

export function createGroup() {
  return createProcessor("createGroup", (group: CreateGroup) => {
    return makeApiRequest<Group>("POST", "/groups", {
      body: group,
    }).then((result) => {
      invalidateCache("/groups");
      return result;
    });
  });
}

export function getGroup() {
  return createProcessor("getGroup", (groupId: number) => {
    return makeApiRequest<Group>("GET", "/groups/{id}", {
      params: { "{id}": groupId.toString() },
      cache: { enabled: true, staleTime: 1000 * 60 * 5 },
    });
  });
}

export function updateGroup() {
  return createProcessor(
    "updateGroup",
    (groupId: number, newData: PatchGroup) => {
      return makeApiRequest<Group>("PATCH", "/groups/{id}", {
        body: newData,
        params: { "{id}": groupId.toString() },
      }).then((result) => {
        invalidateCache("/groups/{id}", { "{id}": groupId.toString() });
        invalidateCache("/groups");
        return result;
      });
    },
  );
}

export function deleteGroup() {
  return createProcessor("deleteGroup", (groupId: number) => {
    return makeApiRequest<{ success: true }>("DELETE", "/groups/{id}", {
      params: { "{id}": groupId.toString() },
    });
  });
}
