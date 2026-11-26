import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { cn } from "../../../js/utils/tw";

/*

aria label props required

*/

const ActionButton = ({
  labelTranslationKey,
  onClick,
  icon,
  disabled = false,
  loading = false,
  className,
}: {
  labelTranslationKey: string;
  onClick: () => void;
  icon?: IconProp;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <button
      className={cn("btn btn-secondary border", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="icon" />}
      {loading ? (
        <FontAwesomeIcon
          icon={faHourglass}
          size="2x"
          className="loading-spinner"
        />
      ) : (
        t(labelTranslationKey)
      )}
    </button>
  );
};

export default ActionButton;
