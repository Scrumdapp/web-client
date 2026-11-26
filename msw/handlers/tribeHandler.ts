import { http, HttpResponse } from "msw";
import { Tribe, TribeGroupUsers } from "../../src/js/models/tribe";
import { groupData } from "./groupHandlers";
import { groupUserData } from "./groupUserHandler";

export const tribeData: Tribe[] = [
  {
    id: 1,
    name: "Tribe Vince & Merijn",
    background_preference: "7_2",
    group_count: 4,
    user_count: 32,
    is_active: true,
    groups: groupData,
    owner_id: 102,
  },
  {
    id: 2,
    name: "Tribe Hidde & Yara",
    background_preference: "color_red",
    group_count: 2,
    user_count: 8,
    is_active: true,
    groups: groupData.slice(0, 2),
    owner_id: 102,
  },
  {
    id: 3,
    name: "Tribe Ole",
    background_preference: "22",
    group_count: 3,
    user_count: 17,
    is_active: true,
    groups: groupData.slice(0, 3),
    owner_id: 102,
  },
  {
    id: 4,
    name: "Tribe Roelof",
    background_preference: "22",
    group_count: 1,
    user_count: 6,
    is_active: false,
    groups: groupData.slice(0, 1),
    owner_id: 102,
  },
];

export const tribeHandlers = [
  http.get("/api/tribes", async ({}) => {
    // remove groups
    // err translations
    return HttpResponse.json(tribeData.filter((it) => it.id < 5));
  }),
  http.post("/api/tribes", ({}) => {
    const tribe = tribeData[0];
    if (tribe) {
      return HttpResponse.json(tribe);
    }
    return HttpResponse.json(
      {
        status: 404,
        code: "TRIBE_NOT_FOUND",
        titleTranslationKey: "errors.tribe.notFound.title",
        descriptionTranslationKey: "errors.tribe.notFound.description",
      } as object,
      {
        status: 404,
      },
    );
  }),
  http.get("/api/tribes/:tid", async ({ params }) => {
    // @ts-ignore
    const tribe = tribeData.find((it) => it.id == params.tid);
    if (tribe) {
      return HttpResponse.json(tribe);
    }
    return HttpResponse.json(
      {
        status: 404,
        code: "TRIBE_NOT_FOUND",
        titleTranslationKey: "errors.tribe.notFound.title",
        descriptionTranslationKey: "errors.tribe.notFound.description",
      } as object,
      {
        status: 404,
      },
    );
  }),
  http.get("/api/tribes/:tid/users", ({ params }) => {
    const tribe = tribeData.find(
      (t) => t.id === parseInt(params.tid as string),
    );
    if (!tribe)
      return HttpResponse.json(
        {
          status: 404,
          code: "TRIBE_NOT_FOUND",
          titleTranslationKey: "errors.tribe.notFound.title",
          descriptionTranslationKey: "errors.tribe.notFound.description",
        } as object,
        {
          status: 404,
        },
      );

    return HttpResponse.json<TribeGroupUsers[]>(
      tribe.groups.map((group) => ({
        group_id: group.id,
        users: (
          groupUserData.find((it) => it.groupId === group.id)?.users ?? []
        ).map(({ user_id, first_name, last_name }) => ({
          user_id,
          first_name,
          last_name,
        })),
      })),
    );
  }),
  http.patch("/api/tribes/:tid", ({ params }) => {
    // @ts-ignore
    const tribe = tribeData.find((it) => it.id == params.tid);
    if (tribe) {
      return HttpResponse.json(tribe);
    }
    return HttpResponse.json(
      {
        status: 404,
        code: "TRIBE_NOT_FOUND",
        titleTranslationKey: "errors.tribe.notFound.title",
        descriptionTranslationKey: "errors.tribe.notFound.description",
      } as object,
      {
        status: 404,
      },
    );
  }),
];
