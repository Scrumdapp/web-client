import { useEffect, useState } from "react";


export default function useTempState<T>(defaultValue: T | null = null, timeout: number = 3000): [T | null, React.Dispatch<T>] {
    const [v, setV] = useState<T | null>(defaultValue);

    useEffect(() => {
        if (v == null) { return }
        const id = setTimeout(() => setV(defaultValue), timeout)
        return () => clearTimeout(id)
    }, [v])

    return [v, setV]
}
