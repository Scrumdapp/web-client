import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { starsOptions, getStarsColor } from "./CheckinColor.tsx";

("use client");

type StarsDropDownMenuProps = {
  value?: number | null;
  onChange?: (value: number | null) => void;
};

export default function StarsDropDownMenu({
  value,
  onChange,
}: StarsDropDownMenuProps) {
  const [localValue, setLocalValue] = useState<number | null>(value ?? null);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value ?? null);
    }
  }, [value]);

  const resolvedValue = value !== undefined ? (value ?? null) : localValue;
  const currentOption =
    starsOptions.find((opt) => opt.value === resolvedValue) ?? starsOptions[0];
  const currentColor = getStarsColor(resolvedValue);

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-between btn border cursor-pointer overflow-hidden">
        <span className={`truncate w-10 max-w-10 text-left ${currentColor}`}>
          {currentOption.label}
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className={`size-5 ${currentColor} shrink-0`}
        />
      </MenuButton>
      <MenuItems
        transition
        className="absolute z-10 mt-2 w-20 max-w-20 origin-top-left border rounded-md bg-bg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {starsOptions.map((opt) => (
            <MenuItem
              key={opt.label}
              as="button"
              type="button"
              onClick={() => {
                setLocalValue(opt.value);
                onChange?.(opt.value);
              }}
              className={`btn-attendance ${opt.color} w-full text-left`}
            >
              {opt.label}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
