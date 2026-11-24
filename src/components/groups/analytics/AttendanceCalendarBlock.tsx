import { useId } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faClock,
  faKitMedical,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import { calendarColors } from "../../../js/utils/analyticsColors.ts";
import type { CalStatus } from "../../../js/utils/analyticsUtils.ts";
import { Legend } from "./AnalyticsCard.tsx";

const statusIcon: Record<CalStatus, IconDefinition> = {
  present: faCheck,
  late: faClock,
  sick: faKitMedical,
  absent: faXmark,
};

interface Props {
  weeks: ({
    date: Date;
    checkpoints: { name: string; status: CalStatus | null }[];
  } | null)[][];
  checkpoint: string | null;
  empty: boolean;
}

export function AttendanceCalendarBlock({ weeks, checkpoint, empty }: Props) {
  const { t, i18n } = useTranslation();
  const idPrefix = useId();
  // Short weekday labels (Mon-Fri) in the current language; 1 Jan 2024 was a Monday
  const weekdayFormat = new Intl.DateTimeFormat(i18n.language, {
    weekday: "short",
  });
  const weekdays = [1, 2, 3, 4, 5].map((day) =>
    weekdayFormat.format(new Date(2024, 0, day)).replace(".", ""),
  );
  const dateFormat = new Intl.DateTimeFormat(i18n.language, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const statusLabel = (status: CalStatus | null) =>
    status == null
      ? t("analytics.calendarNoStatus")
      : t(`analytics.calendarLegend.${status}`);

  return (
    <>
      <div className="analytics-cal-grid mb-1.5">
        {weekdays.map((d) => (
          <span
            className="text-center text-xs font-bold uppercase text-gray"
            key={d}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="analytics-cal-grid">
        {weeks.flat().map((cell, i) => {
          if (cell == null) return <div key={i} />;
          const status =
            cell.checkpoints.find((c) => c.name === checkpoint)?.status ?? null;
          // Without data for the selected checkpoint, dots show the status of the other checkpoints that day
          const others =
            status == null
              ? cell.checkpoints.filter(
                  (c) => c.name !== checkpoint && c.status != null,
                )
              : [];
          const edge = i % 5 === 0 ? " left" : i % 5 === 4 ? " right" : "";
          return (
            <div
              key={i}
              className={`analytics-cal-cell${status == null ? " no-status" : ""}`}
              style={
                status ? { backgroundColor: calendarColors[status] } : undefined
              }
              tabIndex={0}
              aria-label={`${statusLabel(status)}, ${dateFormat.format(cell.date)}`}
              aria-describedby={`${idPrefix}-${i}`}
            >
              {/* Icon sized as WCAG "large text" so 3:1 background contrast is sufficient */}
              {/* At least 16x16 px, still recognizable at 200% zoom */}
              {/* Hint only (aria-hidden): the tooltip names each checkpoint with its status */}
              {others.length > 0 && (
                <span
                  className="absolute top-1 right-1 flex gap-0.5"
                  aria-hidden="true"
                >
                  {others.map((c) => (
                    <span
                      key={c.name}
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor: calendarColors[c.status as CalStatus],
                      }}
                    />
                  ))}
                </span>
              )}
              {status && (
                <span
                  className="min-w-4 min-h-4 text-base leading-none text-center"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={statusIcon[status]} />
                </span>
              )}
              <span className="text-[0.65rem] leading-none" aria-hidden="true">
                {cell.date.getDate()}
              </span>
              <div
                role="tooltip"
                id={`${idPrefix}-${i}`}
                className={`analytics-cal-tip${edge}`}
              >
                <p className="mb-1 font-bold text-fg first-letter:uppercase">
                  {dateFormat.format(cell.date)}
                </p>
                {cell.checkpoints.length === 0 && (
                  <p>{t("analytics.calendarNoCheckpoint")}</p>
                )}
                <ul>
                  {cell.checkpoints.map((c, j) => (
                    <li key={j}>
                      {c.status && (
                        <FontAwesomeIcon
                          icon={statusIcon[c.status]}
                          className="mr-1"
                          aria-hidden="true"
                        />
                      )}
                      {c.name}: {statusLabel(c.status)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      {empty && (
        <p className="mt-3 text-center text-sm text-fg4">
          {t("analytics.calendarEmpty")}
        </p>
      )}
      <Legend
        className="mt-4"
        items={(Object.keys(calendarColors) as CalStatus[]).map((status) => ({
          label: t(`analytics.calendarLegend.${status}`),
          color: calendarColors[status],
          icon: statusIcon[status],
        }))}
      />
    </>
  );
}

export function CheckpointNameSelector({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (checkpoint: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <Menu as="div" className="relative min-w-0 max-w-full">
      {/* Long checkpoint names are truncated so the button never grows wider than the card */}
      <MenuButton
        className="btn border min-w-32 max-w-full"
        aria-label={t("analytics.calendarCheckpointAriaLabel")}
        title={value}
      >
        <span className="min-w-0 truncate">{value}</span>
        <FontAwesomeIcon icon={faChevronDown} className="shrink-0" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute z-30 mt-2 border rounded-md bg-bg w-full"
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            as="button"
            className="btn w-full"
            title={option}
            onClick={() => onChange(option)}
          >
            <span className="min-w-0 truncate">{option}</span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
