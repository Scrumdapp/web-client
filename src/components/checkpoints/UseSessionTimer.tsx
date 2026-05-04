import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {msToMinuteFormat} from "../../js/utils/timeUtils.ts";

function useSessionTimer(expiryTimestamp: number): number {
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

export function UseSessionTimer({
        expiryTimeStamp,
        isLocked,
    }: {
        expiryTimeStamp: number;
        isLocked?: ReactNode;
}) {
    const remainingTimeSeconds = useSessionTimer(expiryTimeStamp);
    const locked = remainingTimeSeconds <= 0;

    if (locked) return isLocked ?? <span>time has expired</span>;

    return <p className="text-sm">expires in {msToMinuteFormat(remainingTimeSeconds)}</p>;
}