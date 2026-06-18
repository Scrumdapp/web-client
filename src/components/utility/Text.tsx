import { PropsWithChildren, useEffect, useRef, useState } from "react";


export function HideIfNotFullyVisible({ className, children }: PropsWithChildren<{ className?: string }>) {

    const [hide, setHidden] = useState(false);
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const elem = ref.current
        if (elem == null) return
        setHidden((elem.parentElement?.clientWidth ?? 0) - 2 <= elem.clientWidth)
    }, [])


    return (
        <span ref={ref} className={hide ? "hidden" : className}>
            {children}
        </span>
    )
}

