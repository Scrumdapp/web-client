import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from "react";

"use client";

export default function StarsDropDownMenu() {

    const [attendance, setAttendance] = useState("---");

    const options = [
        { label: "---", color: "text-fg" },
        { label: "0", color: "text-red-dim", value:"0" },
        { label: "0,5", color: "text-red", value:"1" },
        { label: "1", color: "text-orange-dim", value:"2" },
        { label: "1,5", color: "text-orange", value:"3" },
        { label: "2", color: "text-yellow-dim", value:"4" },
        { label: "2,5", color: "text-yellow", value:"5" },
        { label: "3", color: "text-green-dim", value:"6" },
        { label: "3,5", color: "text-green", value:"7" },
        { label: "4", color: "text-aqua-dim", value:"8" },
        { label: "4,5", color: "text-aqua", value:"9" },
        { label: "5", color: "text-blue", value:"10" },
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