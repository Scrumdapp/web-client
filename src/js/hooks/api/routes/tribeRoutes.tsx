import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import { CreateTribe, Tribe, PartialTribe } from "../../../models/tribe.ts";

export function getTribes() {
  return createProcessor("getTribes", () => {
    return makeApiRequest<PartialTribe[]>("GET", "/tribes");
  });
}

export function createTribe() {
  return createProcessor("createTribe", (tribe: CreateTribe) => {
    return makeApiRequest<Tribe>("POST", "/tribes", {
      body: tribe,
    });
  });
}
