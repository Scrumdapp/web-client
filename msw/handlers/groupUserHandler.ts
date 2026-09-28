import { GroupUser, PatchGroupUser } from "../../src/js/models/group";
import { userData } from "./userHandlers";
import { http, HttpResponse } from "msw";

export const groupUserData: GroupUserCollection[] = [
  createGroupCollection(1, [1, 2, 3, 4, 5, 6]),
  createGroupCollection(2, [2, 3]),
  createGroupCollection(3, [3, 4]),
  createGroupCollection(4, [4, 5]),
];

function createGroupCollection(
  groupId: number,
  userIds: number[],
): GroupUserCollection {
  const r: GroupUser[] = [];
  for (const userId of userIds) {
    const user = userData.find((it) => it.id == userId);
    if (!user) continue;
    r.push({
      user_id: userId,
      group_id: groupId,
      first_name: user.first_name,
      last_name: user.last_name,
      is_ghost: false,
    });
  }
  return {
    groupId,
    users: r,
  };
}

export const groupUserHandler = [
  http.get("/api/groups/:gid/users", ({ params }) => {
    const group = groupUserData.find(
      (it) => it.groupId == parseInt(params.gid as string),
    );
    if (group) {
      return HttpResponse.json(group.users);
    }
    return HttpResponse.json(
      {
        error: true,
        status: 404,
        message: "Not found",
        detail: "The group with this ID does not exist",
      } as object,
      {
        status: 404,
      },
    );
  }),
  http.post("/api/groups/:gid/users", ({ params }) => {
    const group = groupUserData.find(
      (it) => it.groupId == parseInt(params.gid as string),
    );
    if (group) {
      return HttpResponse.json(group.users);
    }
    return HttpResponse.json(
      {
        error: true,
        status: 404,
        message: "Not found",
        detail: "The group with this ID does not exist",
      } as object,
      {
        status: 404,
      },
    );
  }),
  http.get("/api/groups/:gid/users/:uid", ({ params }) => {
    const group = groupUserData.find(
      (it) => it.groupId == parseInt(params.gid as string),
    );
    if (!group) {
      return HttpResponse.json(
        {
          error: true,
          status: 404,
          message: "Not found",
          detail: "The group with this ID does not exist",
        } as object,
        {
          status: 404,
        },
      );
    }
    const users = group.users;
    const user = users.find(
      (it) => it.user_id == parseInt(params.uid as string),
    );
    if (!user) {
      return HttpResponse.json(
        {
          error: true,
          status: 404,
          message: "Not found",
          detail: "This user does not exist in the group",
        } as object,
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json(user);
  }),
  http.patch("/api/groups/:gid/users/:uid", async ({ params, request }) => {
    const body = (await request.json()) as PatchGroupUser;
    const group = groupUserData.find(
      (it) => it.groupId == parseInt(params.gid as string),
    )!;
    const user = group.users.find(
      (it) => it.user_id == parseInt(params.uid as string),
    )!;

    if (body.is_ghost != null) {
      user.is_ghost = body.is_ghost!;
    }

    return new HttpResponse({}, { status: 204 });
  }),
  http.delete("/api/groups/:gid/users/:uid", ({ params }) => {
    const group = groupUserData.find(
      (it) => it.groupId == parseInt(params.gid as string),
    );
    if (!group) {
      return HttpResponse.json(
        {
          error: true,
          status: 404,
          message: "Not found",
          detail: "The group with this ID does not exist",
        } as object,
        {
          status: 404,
        },
      );
    }

    const users = group.users;
    const user = users.find(
      (it) => it.user_id == parseInt(params.uid as string),
    );
    if (!user) {
      return HttpResponse.json(
        {
          error: true,
          status: 404,
          message: "Not found",
          detail: "This user does not exist in the group",
        } as object,
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({ success: true });
  }),
];

export interface GroupUserCollection {
  groupId: number;
  users: GroupUser[];
}
