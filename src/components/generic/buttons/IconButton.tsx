import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { cn } from "../../../js/utils/tw";

/*

aria label props required

*/

const IconButton = ({
  onClick,
  labelTranslationKey,
  icon,
  className = "",
  iconClassName = "",
}: {
  onClick: () => void;
  labelTranslationKey?: string;
  icon?: IconProp;
  className?: string;
  iconClassName?: string;
}) => {
  const { t } = useTranslation();
  const iconOnly = labelTranslationKey === undefined && icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "btn bg-bg_h p-1 md:p-2 border hover:bg-bg2 active:bg-bg3",
        className,
        iconOnly && "aspect-square",
      )}
    >
      {labelTranslationKey && t(labelTranslationKey)}
      {icon && (
        <FontAwesomeIcon icon={icon} className={cn("icon", iconClassName)} />
      )}
    </button>
  );
};

export default IconButton;
