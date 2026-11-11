import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import { GroupUser, PatchGroupUser } from "../../../models/group.ts";

export function getGroupUsers() {
  return createProcessor("getGoupUsers", (groupId: number) => {
    return makeApiRequest<GroupUser[]>("GET", "/groups/{id}/users", {
      params: { "{id}": groupId.toString() },
    }).then((it) =>
      it.sort((a, b) => {
        const nameSplitA = a.last_name.split(" ");
        const nameA =
          nameSplitA.length == 0 ? "" : nameSplitA[nameSplitA.length - 1];
        const nameSplitB = b.last_name.split(" ");
        const nameB =
          nameSplitB.length == 0 ? "" : nameSplitB[nameSplitB.length - 1];
        return nameA.localeCompare(nameB);
      }),
    );
  });
}

export function addUser() {
  return createProcessor("addUser", (groupId: number, userId: number) => {
    return makeApiRequest<GroupUser>("POST", "/groups/{id}/users", {
      body: { user_id: userId },
      params: { "{id}": groupId.toString() },
    });
  });
}

export function updateGroupUser() {
  return createProcessor(
    "updateGroupUser",
    (groupId: number, userId: number, payload: PatchGroupUser) => {
      return makeApiRequest("PATCH", "/groups/{group.id}/users/{user.id}", {
        params: {
          "{group.id}": groupId.toString(),
          "{user.id}": userId.toString(),
        },
        body: payload,
      });
    },
  );
}

export function deleteGroupUser() {
  return createProcessor(
    "deleteGroupUser",
    (groupId: number, userId: number) => {
      return makeApiRequest<{ success: true }>(
        "DELETE",
        "/groups/{group.id}/users/{user.id}",
        {
          params: {
            "{group.id}": groupId.toString(),
            "{user.id}": userId.toString(),
          },
        },
      );
    },
  );
}
