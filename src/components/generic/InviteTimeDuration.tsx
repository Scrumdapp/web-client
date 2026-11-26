import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

type TimeDurationDropdownMenuProps = {
  value?: number | null;
  onChange?: (value: number | null) => void;
};

export const InviteTimeDuration = [
  { labelKey: "time.twelveHours", hours: 12 },
  { labelKey: "time.oneDay", hours: 24 },
  { labelKey: "time.twoDays", hours: 48 },
  { labelKey: "time.threeDays", hours: 72 },
  { labelKey: "time.oneWeek", hours: 168 },
];

export function InviteTimeDurationDropdownMenu({
  value,
  onChange,
}: TimeDurationDropdownMenuProps) {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<number | null>(value ?? null);

  const updateValue = (value: number | null) => {
    setLocalValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    setLocalValue(value ?? null);
  }, [value]);

  const currentOption =
    InviteTimeDuration.find((opt) => opt.hours === localValue) ??
    InviteTimeDuration[0];

  return (
    <Menu as="div" className="relative w-full">
      <MenuButton className="btn-attendance border cursor-pointer h-10.5!">
        <span className="text-left">{t(currentOption.labelKey)}</span>
        <FontAwesomeIcon icon={faChevronDown} className="shrink-0" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute z-10 mt-2 border rounded-md bg-bg w-full py-1"
      >
        <div>
          {InviteTimeDuration.map((opt) => (
            <MenuItem
              key={t(opt.labelKey)}
              as="button"
              type="button"
              onClick={() => updateValue(opt.hours)}
              className="btn-attendance-dropdown py-1"
            >
              {t(opt.labelKey)}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
