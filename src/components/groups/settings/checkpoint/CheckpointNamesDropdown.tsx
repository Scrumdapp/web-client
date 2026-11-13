import { useTranslation } from "react-i18next";
import { Select } from "../../../generic/Select.tsx";

type Props = {
  names: string[];
  value: string;
  onChange: (name: string) => void;
  disabled: boolean;
};

export default function CheckpointNamesDropdown({
  names,
  value,
  onChange,
  disabled,
}: Props) {
  const { t } = useTranslation();

  return (
    <Select
      label={t("a11y.checkpointModal.name")}
      value={value}
      onChange={onChange}
      disabled={disabled}
      buttonClassName="h-10.5!"
      options={names.map((name) => ({ value: name, label: name }))}
      buttonContent={
        // Placeholder uses fg4 rather than opacity so it keeps 4.5:1 contrast (WCAG 1.4.3)
        <span className={`truncate ${value ? "" : "text-fg4"}`}>
          {value || t("checkpoint.modal.type")}
        </span>
      }
    />
  );
}
