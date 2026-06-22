import {PropsWithChildren, useState} from "react";
import {BackgroundContext, backgroundContext} from "./backgroundContext.ts";
import {BackgroundOverride} from "./BackgroundOverride";

export function BackgroundProvider({ initialBackground, children }: PropsWithChildren<{ initialBackground: string}>) {
    const Provider = backgroundContext.Provider
    const [ value ] = useState(new BackgroundContext())

    return (
        // @ts-ignore
        <Provider value={value}>
            <BackgroundOverride background={initialBackground} priority={-10} />
            {children}
        </Provider>
    )
}