import { useId } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  value?: string | null;
  onChange?: (value: string) => void;
};

export default function AttendanceTextArea({ value, onChange }: Props) {
  const { t } = useTranslation();
  const id = useId();

  return (
    <div className="mt-1">
      <label className="sr-only" htmlFor={id}>
        {t("checkpoint.notes")}
      </label>
      <textarea
        id={id}
        className="write-section-attendance"
        placeholder={t("checkpoint.notes")}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
