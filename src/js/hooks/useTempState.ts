import { useEffect, useState } from "react";


export default function useTempState<T>(initial: T | null = null, timeout: number = 3000) {
    const [v, setV] = useState<T | null>(initial);

    useEffect(() => {
        if (v == null) { return }
        const id = setTimeout(() => setV(null), timeout)
        return () => clearTimeout(id)
    }, [v])

    return [v, setV]
}
