import { useEffect, useState } from "react";

export interface TimerData {
  start: Date;
  end: Date;
  timeLeftSec: number;
  completed: boolean;
}

export function useTimer(
  startTime: Date,
  durationSec: number,
  updateIntervalSec: number,
  onCompleted?: () => void,
): TimerData {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, startTime.getTime() + durationSec * 1000 - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = Math.max(
        0,
        startTime.getTime() + durationSec * 1000 - Date.now(),
      );
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        onCompleted?.();
      }
    }, updateIntervalSec * 1000);
    return () => clearInterval(id);
  }, [startTime, updateIntervalSec, durationSec, onCompleted]);

  return {
    start: startTime,
    end: new Date(startTime.getTime() + durationSec * 1000),
    timeLeftSec: timeLeft / 1000,
    completed: timeLeft == 0
  };
}
