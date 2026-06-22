import {useBackgroundContext} from "./hooks";
import {useEffect} from "react";

export function BackgroundOverride({background, priority = 10}: { background: string, priority?: number }) {
    const ctx = useBackgroundContext()

    useEffect(() => {
        const id = ctx.addBackgroundOverride(priority, background)
        return () => ctx.removeBackgroundOverride(id)
    }, [background, priority]);

    return null;
}