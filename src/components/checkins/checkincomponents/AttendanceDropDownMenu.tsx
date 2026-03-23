import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from "react";

"use client";

export default function AttendanceDropDownMenu({currentAttendance} : {currentAttendance?: string | null}) {
    const formatPresence = (val: string) => val?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    const [attendance, setAttendance] = useState(formatPresence(currentAttendance ?? "---"));

    const options = [
        { label: "---", color: "text-gray"},
        { label: "On Time", color: "text-green"},
        { label: "Late", color: "text-orange"},
        { label: "Verified Late", color: "text-orange-dim"},
        { label: "Absent", color: "text-red"},
        { label: "Verified Absent", color: "text-aqua"},
        { label: "Online", color: "text-purple"},
        { label: "Sick", color: "text-blue"},
    ];

    const currentColor = options.find(opt => opt.label === attendance)?.color || "text-gray";

    return (
        <Menu as="div" className="relative w-full w-[20%]">
            <MenuButton className="btn-attendance border cursor-pointer">
                <span className={`text-left ${currentColor}`}>
                    {attendance}
                </span>
                <ChevronDownIcon aria-hidden="true" className={`size-5 ${currentColor} shrink-0`}/>
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full">
                <div>
                    {options.map((opt) => (
                        <MenuItem
                            key={opt.label}
                            as="button"
                            type="button"
                            onClick={() => setAttendance(opt.label)}
                            className={`btn-attendance-dropdown ${opt.color}`}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}