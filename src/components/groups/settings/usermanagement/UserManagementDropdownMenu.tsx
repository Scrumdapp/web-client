import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { roleOptions, getRoleColor } from "../../../../js/utils/colorUtils.ts";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

type UserManagementDropDownMenuProps = {
    value?: string | null;
    onChange?: (value: string | null) => void;
};

export function UserManagementDropDownMenu({value, onChange,}: UserManagementDropDownMenuProps) {
    const {t} = useTranslation();
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
    const currentOption = roleOptions.find((opt) => opt.value === resolvedValue) ?? roleOptions[0];
    const currentColor = getRoleColor(resolvedValue);

    return (
        <Menu as="div" className="relative">
            <MenuButton className="btn-attendance border cursor-pointer">
                <span className={`text-left ${currentColor}`}>
                    {t(currentOption.labelKey)}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className={`${currentColor} shrink-0`}/>
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full">
                <div>
                    {roleOptions.map((opt) => (
                        <MenuItem
                            key={t(opt.labelKey)}
                            as="button"
                            type="button"
                            onClick={() => updateValue(opt.value)}
                            className={`btn-attendance-dropdown ${opt.color}`}>
                            {t(opt.labelKey)}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}