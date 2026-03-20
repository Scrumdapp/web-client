// checkincomponents/CheckinColors.ts

export const attendanceOptions = [
    { label: "---", color: "text-fg" },
    { label: "Present", color: "text-green" },
    { label: "Late", color: "text-orange" },
    { label: "Absent", color: "text-red" },
    { label: "Verified Absent", color: "text-aqua" },
    { label: "Online", color: "text-purple" },
    { label: "Sick", color: "text-blue" },
];

export function getAttendanceColor(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.label === value)?.color ?? "text-fg";
}

export const starsOptions = [
    { label: "---", color: "text-fg", value: null },
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
    return starsOptions.find(opt => opt.value === value)?.color ?? "text-fg";
}
