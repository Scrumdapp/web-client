import { ComponentPropsWithoutRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { cn } from "../../../../js/utils/tw.ts";

export default function InvitePasswordField({
  ...props
}: ComponentPropsWithoutRef<"input">) {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisible(false);
    props.onChange?.(e);
  };

  props.className = cn("write-section pr-9! w-full!", props.className);
  props.type = isVisible ? "text" : "password";

  return (
    <div className="relative">
      <input {...props} onChange={handleChange} />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        aria-label={
          isVisible
            ? t("invite.hidePasswordSpoiler")
            : t("invite.showPasswordSpoiler")
        }
      >
        <FontAwesomeIcon
          icon={isVisible ? faEyeSlash : faEye}
          className="text-fg4 hover:text-fg2"
        />
      </button>
    </div>
  );
}
