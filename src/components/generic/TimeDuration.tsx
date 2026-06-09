import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {useEffect, useState} from "react";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type TimeDurationDropdownMenuProps = {
    value?: number | null;
    onChange?: (value: number | null) => void;
};

export const TimeDuration = [
    { label: "12 hours", hours: 12 },
    { label: "24 hours", hours: 24 },
    { label: "2 days", hours: 48 },
    { label: "3 days", hours: 72 },
    { label: "1 week", hours: 168 },
];

export function TimeDurationDropdownMenu({ value, onChange }: TimeDurationDropdownMenuProps) {
    const [localValue, setLocalValue] = useState<number | null>(value ?? null);

    const updateValue = (value: number | null) => {
        setLocalValue(value);
        onChange?.(value);
    };

    useEffect(() => {
        setLocalValue(value ?? null);
    }, [value]);

    const currentOption = TimeDuration.find((opt) => opt.hours === localValue) ?? TimeDuration[0];

    return (
        <Menu as="div" className="relative w-full">
            <MenuButton className="btn-attendance border cursor-pointer h-10.5!">
                <span className="text-left">
                    {currentOption.label}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="shrink-0"/>
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full py-1">
                <div>
                    {TimeDuration.map(opt => (
                        <MenuItem
                            key={opt.label}
                            as="button"
                            type="button"
                            onClick={() => updateValue(opt.hours)}
                            className="btn-attendance-dropdown py-1">
                            {opt.label}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}