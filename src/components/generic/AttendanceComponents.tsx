import { Fragment, memo } from "react";
import { useTranslation } from "react-i18next";
import {
  attendanceOptions,
  getAttendanceLabelKey,
  getAttendanceOption,
} from "../../js/utils/colorUtils";
import { cn } from "../../js/utils/tw";
import { TribeCheckpointPresence } from "../../js/models/tribe";

const ATTENDANCE_ORDER = attendanceOptions.map((opt) => opt.value);

export const AttendanceLegend = () => {
  const { t } = useTranslation();
  return (
    <div className="card p-4 space-y-2">
      <p>{t("checkpoint.attendance")}:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:flex items-center flex-wrap gap-3 text-fg3 text-sm">
        {attendanceOptions.map((option) => (
          <li className="flex items-center gap-2">
            <AttendanceCircle value={option.value} />
            <span>{t(getAttendanceLabelKey(option.value, true))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const AttendanceCircle = ({
  value,
}: {
  value: string | null | undefined;
}) => {
  const option = getAttendanceOption(value);
  return option.value === null ? (
    <div className={cn("size-3 rounded-full bg-bg2 border", option.border)} />
  ) : (
    <div className={cn("size-3 rounded-full", option.background)} />
  );
};

export const AttendanceCircleBar = memo(
  ({
    groupName,
    presences,
  }: {
    groupName: string;
    presences: TribeCheckpointPresence[];
  }) => {
    // Not finished here:
    // Does the API response include members without data?
    // If not, frontend should add extra circles for missing members

    const { t } = useTranslation();
    const sorted = [...presences].sort(
      (a, b) =>
        ATTENDANCE_ORDER.indexOf(a.presence) -
        ATTENDANCE_ORDER.indexOf(b.presence),
    );

    const tooltipRows = attendanceOptions
      .map((opt) => ({
        ...opt,
        names: presences
          .filter((p) => p.presence === opt.value)
          .map((r) => r.name),
      }))
      .filter((row) => row.names.length > 0);

    return (
      <div
        tabIndex={0}
        className="group attendance-bar w-fit flex flex-wrap items-center justify-center gap-1 px-2 py-2 rounded transition-colors hover:bg-bg2 focus:bg-bg2"
      >
        {sorted.map((p, i) => (
          <AttendanceCircle key={i} value={p.presence} />
        ))}
        <div className="attendance-tooltip w-64 p-3 bg-bg border border-fg4 rounded-lg shadow-lg text-sm text-fg invisible opacity-0 translate-y-1 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus:visible group-focus:opacity-100 group-focus:translate-y-0">
          <span className="block font-bold mb-1.5">{groupName}</span>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5">
            {tooltipRows.map((row) => (
              <Fragment key={row.labelKey}>
                <AttendanceCircle value={row.value} />
                <span>{t(row.labelKey)}</span>
                <span className="font-bold">{row.names.length}</span>

                <span className="col-start-2 col-span-2 mb-1.5 leading-snug text-fg3">
                  {row.names.join(", ")}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
