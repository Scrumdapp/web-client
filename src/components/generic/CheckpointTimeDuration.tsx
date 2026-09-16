import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

type CheckpointTimeDurationDropdownMenuProps = {
    value?: number | null;
    onChange?: (value: number | null) => void;
};

export const CheckpointTimeDuration = [
    { labelKey: "checkpoint.modal.duration.fiveminutes", minutes: 5 },
    { labelKey: "checkpoint.modal.duration.tenminutes", minutes: 10 },
    { labelKey: "checkpoint.modal.duration.fifteenminutes", minutes: 15 },
    { labelKey: "checkpoint.modal.duration.twentyminutes", minutes: 20 },
    { labelKey: "checkpoint.modal.duration.thirtyminutes", minutes: 30 },
    { labelKey: "checkpoint.modal.duration.onehour", minutes: 60 },
];

export function CheckpointTimeDurationDropdownMenu({ value, onChange }: CheckpointTimeDurationDropdownMenuProps) {
    const { t } = useTranslation();
    const [localValue, setLocalValue] = useState<number | null>(value ?? null);

    const updateValue = (value: number | null) => {
        setLocalValue(value);
        onChange?.(value);
    };

    useEffect(() => {
        setLocalValue(value ?? null);
    }, [value]);

    const currentOption = CheckpointTimeDuration.find((opt) => opt.minutes === localValue) ?? CheckpointTimeDuration[0];

    return (
        <Menu as="div" className="relative w-full">
            <MenuButton className="btn-attendance border cursor-pointer h-10.5!">
                <span className="text-left">
                    {t(currentOption.labelKey)}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="shrink-0"/>
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full py-1">
                <div>
                    {CheckpointTimeDuration.map(opt => (
                        <MenuItem
                            key={opt.labelKey}
                            as="button"
                            type="button"
                            onClick={() => updateValue(opt.minutes)}
                            className="btn-attendance-dropdown py-1">
                            {t(opt.labelKey)}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}