import { Tribe } from "../../models/tribe.ts";
import { useContext } from "react";
import { tribeContext } from "./tribeContext.ts";

export function useTribe(): Tribe {
  const tribeCtx = useContext(tribeContext);
  if (!tribeCtx?.tribe) {
    console.error(
      "Warning! User was not set, is it provided by the UserProvider?",
    );
  }
  // @ts-ignore
  return tribeCtx?.tribe;
}
