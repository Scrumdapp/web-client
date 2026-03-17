import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from "react";

"use client";

export default function StarsDropDownMenu() {

    const [attendance, setAttendance] = useState("---");

    const options = [
        { label: "---", color: "text-fg" },
        { label: "0", color: "text-red-dim" },
        { label: "0,5", color: "text-red" },
        { label: "1", color: "text-orange-dim" },
        { label: "1,5", color: "text-orange" },
        { label: "2", color: "text-yellow-dim" },
        { label: "2,5", color: "text-yellow" },
        { label: "3", color: "text-green-dim" },
        { label: "3,5", color: "text-green" },
        { label: "4", color: "text-aqua-dim" },
        { label: "4,5", color: "text-aqua" },
        { label: "5", color: "text-blue" },
    ];

    const currentColor = options.find(opt => opt.label === attendance)?.color || "text-fg";

    return (
        <Menu as="div" className="relative inline-block px-3 w-25 max-w-25">
            <MenuButton className="inline-flex w-full justify-between btn border cursor-pointer overflow-hidden">
                <span className={`truncate w-20 max-w-20 text-left ${currentColor}`}>
                    {attendance}
                </span>
                <ChevronDownIcon aria-hidden="true" className="size-5 text-fg4 shrink-0"/>
            </MenuButton>
            <MenuItems transition
                       className="absolute z-10 mt-2 w-20 max-w-20 origin-top-left border rounded-md bg-bg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">
                    {options.map((opt) => (
                        <MenuItem
                            key={opt.label}
                            as="button"
                            type="button"
                            onClick={() => setAttendance(opt.label)}
                            className={`btn-attendance ${opt.color} w-full text-left`}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}