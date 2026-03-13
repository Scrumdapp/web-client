import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function AttendanceDropDownMenu() {

    return (
        <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-center btn border cursor-pointer">
                Stars
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-fg4"/>
            </MenuButton>
            <MenuItems transition
                       className="absolute z-10 mt-2 w-auto origin-top-left rounded-md bg-bg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in border">
                <div className="py-1">
                    <MenuItem><a href="#" className="btn-attendance text-fg">
                        ---
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-red">
                        0
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-red-dim">
                        0,5
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-orange">
                        1
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-orange-dim">
                        1,5
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-yellow">
                        2
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-yellow-dim">
                        2,5
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-green">
                        3
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-green-dim">
                        3,5
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-aqua">
                        4
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-blue">
                        4,5
                    </a></MenuItem>
                    <MenuItem><a href="#" className="btn-attendance text-blue-dim">
                        5
                    </a></MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}