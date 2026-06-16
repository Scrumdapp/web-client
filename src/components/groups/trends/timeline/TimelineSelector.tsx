import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { GroupTimelineDisplayType } from "./GroupTimelineTrends"


const options = [
    {
        name: "Periodic",
        value: GroupTimelineDisplayType.Periodic
    },
    {
        name: "Cumelative",
        value: GroupTimelineDisplayType.Cumelative
    },
]


export function TimelineSelector(
    {
        onRangeSelected = () => { },
        defaultOption = 0
    }: {
        onRangeSelected?: (type: GroupTimelineDisplayType) => void,
        defaultOption?: number
    }) {

    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const selectOption = (index: number) => {
        setSelectedOption(index)
        if (onRangeSelected) {
            const option = options[index]
            onRangeSelected(option.value)
        }
    }

    useEffect(() => {
        setTimeout(() => { selectOption(defaultOption ?? 0) }, 1)
    }, [])

    return (
        <Menu as="div" className="relative">
            <MenuButton
                className="btn border min-w-32"
            >
                {options[selectedOption].name}
                <FontAwesomeIcon icon={faChevronDown} className={`shrink-0`} />
            </MenuButton>
            <MenuItems transition className="absolute z-10 mt-2 border rounded-md bg-bg w-full">
                {options.map((it, i) => (
                    <MenuItem key={i} as="button" className="btn w-full" onClick={() => selectOption(i)}>
                        {it.name}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )

}
