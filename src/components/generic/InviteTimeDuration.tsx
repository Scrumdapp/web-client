import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "./Select.tsx";

type TimeDurationDropdownMenuProps = {
  value?: number | null;
  onChange?: (value: number | null) => void;
  label?: string;
  hideLabel?: boolean;
};

export const InviteTimeDuration = [
  { labelKey: "invite.duration.twelvehours", hours: 12 },
  { labelKey: "invite.duration.oneday", hours: 24 },
  { labelKey: "invite.duration.twodays", hours: 48 },
  { labelKey: "invite.duration.threedays", hours: 72 },
  { labelKey: "invite.duration.oneweek", hours: 168 },
];

export function InviteTimeDurationDropdownMenu({
  value,
  onChange,
  label,
  hideLabel,
}: TimeDurationDropdownMenuProps) {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<number>(
    value ?? InviteTimeDuration[0].hours,
  );

  const updateValue = (value: number) => {
    setLocalValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    setLocalValue(value ?? InviteTimeDuration[0].hours);
  }, [value]);

  return (
    <Select
      label={label ?? t("a11y.checkpointModal.duration")}
      hideLabel={hideLabel}
      value={localValue}
      onChange={updateValue}
      buttonClassName="h-10.5!"
      options={InviteTimeDuration.map((opt) => ({
        value: opt.hours,
        label: t(opt.labelKey),
      }))}
    />
  );
}
