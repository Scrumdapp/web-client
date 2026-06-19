import {PropsWithChildren, useMemo, useState} from "react";
import {backgroundContext} from "./backgroundContext.ts";

export function BackgroundProvider({ initialBackground, children}: PropsWithChildren<{ initialBackground: string}>) {
    const Provider = backgroundContext.Provider
    const [background, setBackground] = useState<string>(initialBackground)

    const value = useMemo(() => ({
        background, setBackground
    }), [background])

    return (
        // @ts-ignore
        <Provider value={value}>
            {children}
        </Provider>
    )
}