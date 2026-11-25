import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useId } from "react";

export const CHECKPOINT_NAME_REGEX = /^[a-zA-Z0-9 \-]{1,32}$/;

type Props = {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  autoFocus?: boolean;
  index: number;
};

export default function CheckpointNamesField({
  value,
  onChange,
  onRemove,
  autoFocus,
  index,
}: Props) {
  const { t } = useTranslation();
  const id = useId();
  const showWarning = value !== "" && !CHECKPOINT_NAME_REGEX.test(value);

  return (
    <div className="m-1">
      <div className="flex horizontal justify-between border rounded-lg">
        <input
          type="text"
          value={value}
          maxLength={32}
          autoFocus={autoFocus}
          aria-label={t("a11y.checkpointNames.field", { index })}
          aria-invalid={showWarning || undefined}
          aria-describedby={showWarning ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("settings.checkpointNames.placeholder")}
          className="w-full write-section border-transparent!"
        />
        {onRemove && (
          <button
            type="button"
            className="btn text-red"
            onClick={onRemove}
            aria-label={t("a11y.checkpointNames.remove", { index })}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        )}
      </div>
      {showWarning && (
        <p id={`${id}-error`} className="text-red text-sm">
          {t("invite.modal.error")}
        </p>
      )}
    </div>
  );
}
