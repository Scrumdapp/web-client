import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react"
import { useEffect, useState } from "react"
import { toScrumdappDate } from "../../../js/utils/scrumdappDate"
import { getWeekStart } from "../../../js/utils/timeUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"


const options = [
    {
        name: "Last 2 weeks",
        from: () => getWeekStart(new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000))),
        to: () => new Date()
    },
    {
        name: "Last 6 months",
        from: () => getWeekStart(new Date(new Date().getTime() - (6 * 4 * 7 * 24 * 60 * 60 * 1000))),
        to: () => new Date()
    },
]


export function TimeRangeSelector(
    {
        onRangeSelected = () => { },
        defaultOption = 0
    }: {
        onRangeSelected?: (start: string, end: string) => void, defaultOption?: number
    }) {

    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const selectOption = (index: number) => {
        setSelectedOption(index)
        if (onRangeSelected) {
            const option = options[index]
            onRangeSelected(toScrumdappDate(option.from()), toScrumdappDate(option.to()))
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
