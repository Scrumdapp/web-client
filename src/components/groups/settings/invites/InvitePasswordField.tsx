import { ComponentPropsWithoutRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function InvitePasswordField({
  ...props
}: ComponentPropsWithoutRef<"input">) {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <input {...props} type={isVisible ? "text" : "password"} />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-4 cursor-pointer"
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
