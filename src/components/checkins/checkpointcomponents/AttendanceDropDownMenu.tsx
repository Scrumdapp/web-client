import { useEffect, useState } from "react";
import {
  attendanceOptions,
  getAttendanceColorScrummaster,
} from "../../../js/utils/colorUtils.ts";
import { useTranslation } from "react-i18next";
import { Select } from "../../generic/Select.tsx";

type AttendanceDropDownMenuProps = {
  value?: string | null;
  onChange?: (value: string | null) => void;
  label: string;
  hideLabel?: boolean;
  labelClassName?: string;
};

export function AttendanceDropDownMenu({
  value,
  onChange,
  label,
  hideLabel,
  labelClassName,
}: AttendanceDropDownMenuProps) {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<string | null>(value ?? null);

  const updateValue = (value: string | null) => {
    setLocalValue(value ?? null);
    onChange?.(value ?? null);
  };

  useEffect(() => {
    setLocalValue(value ?? null);
  }, [value]);

  const currentOption = attendanceOptions.find(
    (opt) => opt.value === localValue,
  );
  const currentColor = getAttendanceColorScrummaster(localValue);
  const isValueSet = localValue !== null;

  return (
    <Select
      label={label}
      hideLabel={hideLabel}
      labelClassName={labelClassName}
      value={localValue}
      onChange={updateValue}
      chevronClassName={currentColor}
      buttonContent={
        <span className={`text-left ${currentColor}`}>
          {isValueSet && currentOption ? t(currentOption.labelKey) : "---"}
        </span>
      }
      options={attendanceOptions
        .filter((opt) => opt.value !== null)
        .map((opt) => ({
          value: opt.value,
          label: t(opt.labelKey),
          className: opt.color,
        }))}
    />
  );
}
