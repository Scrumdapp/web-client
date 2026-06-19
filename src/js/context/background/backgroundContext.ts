import {createContext} from "react";

export interface BackgroundContextState {
    background?: string
    setBackground: (background?: string) => void
}

export const backgroundContext = createContext<BackgroundContextState | null>(null)