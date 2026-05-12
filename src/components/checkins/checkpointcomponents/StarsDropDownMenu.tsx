import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {useEffect, useState} from "react";
import {starsOptions, getStarsColor} from "../../../js/utils/colorUtils.ts";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type StarsDropDownMenuProps = {
    value?: number | null;
    onChange?: (value: number | null) => void;
};

export function StarsDropDownMenu({value, onChange,}: StarsDropDownMenuProps) {
    const [localValue, setLocalValue] = useState<number | null>(value ?? null);

    const updateValue = (value: number | null) => {
        setLocalValue(value ?? null)
        if (onChange != null) {
            onChange(value ?? null)
        }
    }

    useEffect(() => {
        setLocalValue(value ?? null);
    }, [value]);

    const resolvedValue = value !== undefined ? (value ?? null) : localValue;
    const currentOption = starsOptions.find((opt) => opt.value === resolvedValue) ?? starsOptions[0];
    const currentColor = getStarsColor(resolvedValue);

    return (
        <Menu as="div" className="relative w-full w-[10%]">
            <MenuButton className="btn-attendance border cursor-pointer">
                <span className={`text-left ${currentColor}`}>
                    {currentOption.label}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className={`${currentColor} shrink-0`}/>
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