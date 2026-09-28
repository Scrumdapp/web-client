import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface CheckboxProps {
  labelKey?: string;
  labelClassName?: string;
}

export function Checkbox({
  className,
  type = "checkbox",
  checked,
  onChange,
  labelKey,
  name,
  ...inputProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  CheckboxProps) {
  const { t } = useTranslation();
  const [v, setV] = useState(checked);

  const changed = (it: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    console.log("changed");
    setV(it.target.checked);
    onChange?.(it);
  };

  useEffect(() => {
    setV(checked);
  }, [checked]);

  return (
    <label className={clsx("checkbox-container", className)}>
      {labelKey && t(labelKey)}
      <input type={type} checked={v} onChange={changed} {...inputProps} />
      <span className="checkmark">
        <FontAwesomeIcon icon={checked ? faCheck : faX} />
      </span>
    </label>
  );
}
