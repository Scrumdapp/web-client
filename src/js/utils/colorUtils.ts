export const attendanceOptions = [
  {
    labelKey: "generic.attendance.onTime",
    color: "text-green",
    background: "bg-green",
    value: "ON_TIME",
  },
  {
    labelKey: "generic.attendance.online",
    color: "text-purple",
    background: "bg-purple",
    value: "ONLINE",
  },
  {
    labelKey: "generic.attendance.late",
    color: "text-orange-dim",
    background: "bg-orange-dim",
    value: "LATE",
  },
  {
    labelKey: "generic.attendance.verifiedLate",
    color: "text-orange",
    background: "bg-orange",
    value: "VERIFIED_LATE",
  },
  {
    labelKey: "generic.attendance.absent",
    color: "text-red-dim",
    background: "bg-red-dim",
    value: "ABSENT",
  },
  {
    labelKey: "generic.attendance.verifiedAbsent",
    color: "text-red",
    background: "bg-red",
    value: "VERIFIED_ABSENT",
  },
  {
    labelKey: "generic.attendance.sick",
    color: "text-blue",
    background: "bg-blue",
    value: "SICK",
  },
  {
    labelKey: "generic.attendance.none",
    color: "text-gray",
    background: "bg-gray-dim",
    value: null,
  },
];

export function getAttendanceLabelKey(
  value: string | null | undefined,
): string {
  if (value == null) {
    return "generic.attendance.none";
  }
  return (
    attendanceOptions.find((opt) => opt.value === value)?.labelKey ??
    "generic.attendance.none"
  );
}

export function getAttendanceLabelKeyTrends(
  value: string | null | undefined,
): string {
  if (value == null) {
    return "generic.noData";
  }
  return (
    attendanceOptions.find((opt) => opt.value === value)?.labelKey ??
    "generic.attendance.none"
  );
}

export function getAttendanceColor(value: string | null | undefined): string {
  return (
    attendanceOptions.find((opt) => opt.value === value)?.color ?? "text-gray"
  );
}

export function getAttendanceBackgroundColor(
  value: string | null | undefined,
): string {
  return (
    attendanceOptions.find((opt) => opt.value === value)?.background ??
    "bg-gray-dim"
  );
}

export function getAttendanceColorScrummaster(
  value: string | null | undefined,
): string {
  return (
    attendanceOptions.find((opt) => opt.value === value)?.color ?? "text-gray"
  );
}

export const starsOptions = [
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
  return starsOptions.find((opt) => opt.value === value)?.color ?? "text-gray";
}
