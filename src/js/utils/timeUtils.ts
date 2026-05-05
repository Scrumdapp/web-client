export function msToHourFormat(ms: number): string {

    const seconds = Math.floor(ms / 1000) ;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60)

    return `${hours % 24}:${minutes % 60}:${seconds % 60}`;
}

export function msToMinuteFormat(ms: number): string {

    const seconds = Math.floor(ms / 1000) ;
    const minutes = Math.floor(seconds / 60);

    const displaySeconds = (String(seconds % 60).padStart(2, "0"))

    return `${minutes % 60}:${displaySeconds}`;
}

export function parseTimeStr(date: string, time: string): number {
    return new Date(`${date}T${time}Z`).getTime()
}

export function calculateExpiryTime(session: GroupCheckpointSession) {
    return parseTimeStr(session.date, session.startTime) + (session.duration * 60_000);
}