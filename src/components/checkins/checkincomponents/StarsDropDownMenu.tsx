import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import {starsOptions, getStarsColor} from "./CheckinColor.tsx";

type StarsDropDownMenuProps = {
    value?: number;
    onChange?: (value: number | null) => void;
};

export default function StarsDropDownMenu({ value, onChange, }: StarsDropDownMenuProps) {
    const [localValue, setLocalValue] = useState<number | null>(value ?? null);

    const updateValue = (value: number | null) => {
        setLocalValue(value ?? null)
        if (onChange != null) {
            onChange(value ?? null)
        }
    }

    useEffect(() => {
        if (value !== undefined) {
            setLocalValue(value ?? null);
        }
    }, [value]);

    const resolvedValue = value !== undefined ? (value ?? null) : localValue;
    const currentOption = starsOptions.find((opt) => opt.value === resolvedValue) ?? starsOptions[0];
    const currentColor = getStarsColor(resolvedValue);

    return (
        <Menu as="div" className="relative w-full w-[10%]">
            <MenuButton className="btn-attendance border cursor-pointer">
                <span className={`text-left ${currentColor}`}>
                    {resolvedValue}
                </span>
                <ChevronDownIcon aria-hidden="true" className={`size-5 ${currentColor} shrink-0`}/>
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full">
                <div>
                    {starsOptions.map((opt) => (
                        <MenuItem
                            key={opt.label}
                            as="button"
                            type="button"
                            onClick={() => updateValue(opt.value)}
                            className={`btn-attendance-dropdown ${opt.color}`}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}
