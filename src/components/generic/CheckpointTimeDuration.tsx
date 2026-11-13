import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "./Select.tsx";

type CheckpointTimeDurationDropdownMenuProps = {
  value?: number | null;
  onChange?: (value: number | null) => void;
  label?: string;
  hideLabel?: boolean;
};

export const CheckpointTimeDuration = [
  { labelKey: "checkpoint.modal.duration.fiveminutes", minutes: 5 },
  { labelKey: "checkpoint.modal.duration.tenminutes", minutes: 10 },
  { labelKey: "checkpoint.modal.duration.fifteenminutes", minutes: 15 },
  { labelKey: "checkpoint.modal.duration.twentyminutes", minutes: 20 },
  { labelKey: "checkpoint.modal.duration.thirtyminutes", minutes: 30 },
  { labelKey: "checkpoint.modal.duration.onehour", minutes: 60 },
];

export function CheckpointTimeDurationDropdownMenu({
  value,
  onChange,
  label,
  hideLabel,
}: CheckpointTimeDurationDropdownMenuProps) {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<number>(
    value ?? CheckpointTimeDuration[0].minutes,
  );

  const updateValue = (value: number) => {
    setLocalValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    setLocalValue(value ?? CheckpointTimeDuration[0].minutes);
  }, [value]);

  return (
    <Select
      label={label ?? t("a11y.checkpointModal.duration")}
      hideLabel={hideLabel}
      value={localValue}
      onChange={updateValue}
      buttonClassName="h-10.5!"
      options={CheckpointTimeDuration.map((opt) => ({
        value: opt.minutes,
        label: t(opt.labelKey),
      }))}
    />
  );
}
