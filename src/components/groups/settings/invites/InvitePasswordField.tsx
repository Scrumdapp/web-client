import { ComponentPropsWithoutRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function InvitePasswordField({
  ...props
}: ComponentPropsWithoutRef<"input">) {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisible(false);
    props.onChange?.(e);
  };

  return (
    <div className="relative flex items-center">
      <input
        {...props}
        onChange={handleChange}
        type={isVisible ? "text" : "password"}
      />
      <span
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
      </span>
    </div>
  );
}
