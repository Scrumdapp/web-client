import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

type Props = {
  names: string[];
  value: string;
  onChange: (name: string) => void;
};

export default function CheckpointNamesDropdown({
  names,
  value,
  onChange,
}: Props) {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative w-full">
      <MenuButton
        className="btn-attendance border cursor-pointer h-10.5!"
      >
        <span className={`truncate ${value ? "opacity-100" : "opacity-50"}`}>
          {value || t("checkpoint.modal.type")}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="shrink-0" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute z-10 mt-2 border rounded-md bg-bg w-full py-1"
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            as="button"
            type="button"
            onClick={() => onChange(name)}
            className="py-1 btn-attendance-dropdown"
          >
            {name}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
