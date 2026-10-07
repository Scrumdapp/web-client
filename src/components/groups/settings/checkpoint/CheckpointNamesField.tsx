import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const CHECKPOINT_NAME_REGEX = /^[a-zA-Z0-9 !@#$%^&]{1,32}$/;

type Props = {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
};

export default function CheckpointNamesField({
  value,
  onChange,
  onRemove,
}: Props) {
  const { t } = useTranslation();
  const showWarning = value !== "" && !CHECKPOINT_NAME_REGEX.test(value);

  return (
    <div className="m-1">
      <div className="flex horizontal justify-between border rounded-lg">
        <input
          type="text"
          value={value}
          maxLength={32}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("settings.checkpointNames.placeholder")}
          className="w-full write-section border-transparent!"
        />
        {onRemove && (
          <button className="btn text-red" onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      {showWarning && (
        <p className="text-red text-sm">{t("invite.modal.error")}</p>
      )}
    </div>
  );
}
