

export const attendanceOptions = [
    { label: "On Time", color: "text-green", background: "bg-green", value: "ON_TIME" },
    { label: "Online", color: "text-purple", background: "bg-purple", value: "ONLINE" },
    { label: "Late", color: "text-orange-dim", background: "bg-orange-dim", value: "LATE" },
    { label: "Verified Late", color: "text-orange", background: "bg-orange", value: "VERIFIED_LATE" },
    { label: "Absent", color: "text-red-dim", background: "bg-red-dim", value: "ABSENT" },
    { label: "Verified Absent", color: "text-red", background: "bg-red", value: "VERIFIED_ABSENT" },
    { label: "Sick", color: "text-blue", background: "bg-blue", value: "SICK" },
    { label: "---", color: "text-gray", background: "bg-gray-dim", value: null },
];

export function getAttendanceLabel(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.value === value)?.label ?? "---";
}

export function getAttendanceColor(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.label === value)?.color ?? "text-gray";
}

export function getAttendanceBackgroundColor(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.value === value)?.background ?? "bg-gray-dim";
}

export function getAttendanceColorScrummaster(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.value === value)?.color ?? "text-gray";
}

export const starsOptions = [
    { label: "---", color: "text-gray", value: null },
    { label: "0", color: "text-red-dim", value: 0 },
    { label: "0,5", color: "text-red", value: 1 },
    { label: "1", color: "text-orange-dim", value: 2 },
    { label: "1,5", color: "text-orange", value: 3 },
    { label: "2", color: "text-yellow-dim", value: 4 },
    { label: "2,5", color: "text-yellow", value: 5 },
    { label: "3", color: "text-green-dim", value: 6 },
    { label: "3,5", color: "text-green", value: 7 },
    { label: "4", color: "text-aqua-dim", value: 8 },
    { label: "4,5", color: "text-aqua", value: 9 },
    { label: "5", color: "text-blue", value: 10 },
];

export function getStarsColor(value: number | null | undefined): string {
    return starsOptions.find(opt => opt.value === value)?.color ?? "text-gray";
}

export function getformatPresence(value: string): string {
    const formatPresence = (val: string) => val?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    return formatPresence(value);
}

