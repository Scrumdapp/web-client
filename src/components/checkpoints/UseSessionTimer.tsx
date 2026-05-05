import type {ReactNode} from "react";
import {msToMinuteFormat} from "../../js/utils/timeUtils.ts";
import {useSessionTimer} from "../../js/hooks/sessions/useSessionTimer.ts";

export function UseSessionTimer({expiryTimeStamp, isLocked}: {
    expiryTimeStamp: number;
    isLocked?: ReactNode;
}) {
    const remainingTimeSeconds = useSessionTimer(expiryTimeStamp);
    const locked = remainingTimeSeconds <= 0;

    if (locked) return isLocked ?? <span>time has expired</span>;

    return <p className="text-sm">expires in {msToMinuteFormat(remainingTimeSeconds)}</p>;
}