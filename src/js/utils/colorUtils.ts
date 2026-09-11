export const attendanceOptions = [
    { labelKey: "checkpoint.attendanceOptions.onTime", color: "text-green", background: "bg-green", value: "ON_TIME" },
    { labelKey: "checkpoint.attendanceOptions.online", color: "text-purple", background: "bg-purple", value: "ONLINE" },
    { labelKey: "checkpoint.attendanceOptions.late", color: "text-orange-dim", background: "bg-orange-dim", value: "LATE" },
    { labelKey: "checkpoint.attendanceOptions.verifiedLate", color: "text-orange", background: "bg-orange", value: "VERIFIED_LATE" },
    { labelKey: "checkpoint.attendanceOptions.absent", color: "text-red-dim", background: "bg-red-dim", value: "ABSENT" },
    { labelKey: "checkpoint.attendanceOptions.verifiedAbsent", color: "text-red", background: "bg-red", value: "VERIFIED_ABSENT" },
    { labelKey: "checkpoint.attendanceOptions.sick", color: "text-blue", background: "bg-blue", value: "SICK" },
    { labelKey: "checkpoint.attendanceOptions.none", color: "text-gray", background: "bg-gray-dim", value: null },
];

export function getAttendanceLabelKey(value: string | null | undefined): string {
    if (value == null) {
        return "checkpoint.attendanceOptions.none";
    }
    return attendanceOptions.find(opt => opt.value === value)?.labelKey ?? "checkpoint.attendanceOptions.none";
}

export function getAttendanceLabelKeyTrends(value: string | null | undefined): string {
    if (value == null) {
        return "checkpoint.attendanceOptions.noData";
    }
    return attendanceOptions.find(opt => opt.value === value)?.labelKey ?? "checkpoint.attendanceOptions.none";
}

export function getAttendanceColor(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.value === value)?.color ?? "text-gray";
}

export function getAttendanceBackgroundColor(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.value === value)?.background ?? "bg-gray-dim";
}

export function getAttendanceColorScrummaster(value: string | null | undefined): string {
    return attendanceOptions.find(opt => opt.value === value)?.color ?? "text-gray";
}

export const starsOptions = [
    { label: "0", color: "text-red-dim", value: 0 },
    { label: "0,5", color: "text-red", value: 0.5 },
    { label: "1", color: "text-orange-dim", value: 1 },
    { label: "1,5", color: "text-orange", value: 1.5 },
    { label: "2", color: "text-yellow-dim", value: 2 },
    { label: "2,5", color: "text-yellow", value: 2.5 },
    { label: "3", color: "text-green-dim", value: 3 },
    { label: "3,5", color: "text-green", value: 3.5 },
    { label: "4", color: "text-aqua-dim", value: 4 },
    { label: "4,5", color: "text-aqua", value: 4.5 },
    { label: "5", color: "text-blue", value: 5 },
];

export function getStarsColor(value: number | null | undefined): string {
    return starsOptions.find(opt => opt.value === value)?.color ?? "text-gray";
}