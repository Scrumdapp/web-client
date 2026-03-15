import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from "react";

export default function AttendanceDropDownMenu() {

    const [attendance, setAttendance] = useState("Attendance");

    return (
        <Menu as="div" className="relative inline-block px-5">
            <MenuButton className="inline-flex w-full justify-center btn border cursor-pointer">
                {attendance}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-fg4"/>
            </MenuButton>
            <MenuItems transition
                       className="absolute z-10 mt-2 w-auto origin-top-left rounded-md bg-bg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in border">
                <div className="py-1">
                    <MenuItem>
                        <button
                            onClick={() => setAttendance("---")}
                            className="btn-attendance text-green">
                            ---
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            onClick={() => setAttendance("Present")}
                            className="btn-attendance text-green">
                            Present
                        </button>
                    </MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-orange">
                        Late
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-purple">
                        Online
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-red">
                        Absent
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-aqua">
                        Verified Absent
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-blue-dim">
                        Sick
                    </a></MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}