import { memo, ReactNode } from "react";


export const HideIf = memo(({ condition, children }: { condition: boolean, children: ReactNode }) => {
    return condition ? null : children
})

export const ShowIf = memo(({ condition, children }: { condition: boolean, children: ReactNode }) => {
    return condition ? children : null
})
