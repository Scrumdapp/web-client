import {useEffect, useState} from "react";

export function useSessionTimer(expiryTimestamp: number): number {
    const [time, setTime] = useState(() =>
        Math.max(0, expiryTimestamp - Date.now())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            if (time <= 0) return () => clearInterval(interval);
            setTime(time - 1000)
        }, 1000);
        return () => clearInterval(interval)
    }, [time])
    return time;
}

