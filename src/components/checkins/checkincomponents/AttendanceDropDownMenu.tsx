import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from "react";

"use client";

export default function AttendanceDropDownMenu() {

    const [attendance, setAttendance] = useState("---");

    const options = [
        { label: "---", color: "text-fg"},
        { label: "Present", color: "text-green"},
        { label: "Late", color: "text-orange"},
        { label: "Absent", color: "text-red"},
        { label: "Verified Absent", color: "text-aqua"},
        { label: "Online", color: "text-purple"},
        { label: "Sick", color: "text-blue"},
    ];

    const currentColor = options.find(opt => opt.label === attendance)?.color || "text-fg";

    return (
        <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-between btn border cursor-pointer overflow-hidden">
                <span className={`truncate w-10 max-w-10 text-left ${currentColor}`}>
                    {attendance}
                </span>
                <ChevronDownIcon aria-hidden="true" className={`size-5 ${currentColor} shrink-0`}/>
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