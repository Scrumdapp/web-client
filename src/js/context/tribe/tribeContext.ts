import { Tribe } from "../../models/tribe.ts";
import { createContext } from "react";

export class TribeContextState {
  tribe?: Tribe;
  refresh?: () => void;
}

export const tribeContext = createContext<TribeContextState | null>(null);
