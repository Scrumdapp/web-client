import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {useEffect, useState} from "react";
import {attendanceOptions, getAttendanceColorScrummaster} from "./CheckinColor.tsx";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type AttendanceDropDownMenuProps = {
    value?: string | null;
    onChange?: (value: string | null) => void;
};

export function AttendanceDropDownMenu({value, onChange,}: AttendanceDropDownMenuProps) {
    const [localValue, setLocalValue] = useState<string | null>(value ?? null);

    const updateValue = (value: string | null) => {
        setLocalValue(value ?? null)
        if (onChange != null) {
            onChange(value ?? null)
        }
    }

    useEffect(() => {
        setLocalValue(value ?? null);
    }, [value]);

    const resolvedValue = value !== null ? (value ?? null) : localValue;
    const currentOption = attendanceOptions.find((opt) => opt.value === resolvedValue) ?? attendanceOptions[0];
    const currentColor = getAttendanceColorScrummaster(resolvedValue);

    return (
        <Menu as="div" className="relative w-full w-[20%]">
            <MenuButton className="btn-attendance border cursor-pointer">
                <span className={`text-left ${currentColor}`}>
                    {currentOption.label}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className={`${currentColor} shrink-0`}/>
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full">
                <div>
                    {attendanceOptions.map((opt) => (
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