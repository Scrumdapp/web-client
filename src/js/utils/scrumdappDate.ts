const regex = /^(\d{4})-(\d{2})-(\d{2})$/

export function parseScrumdappDate(date: string) {
    const result = regex.exec(date)
    if (result == null) {
        throw new Error("Could not parse date")
    }
    const year = result[1]
    const month = result[2]
    const day = result[3]
    const resultDate = Date.UTC(parseInt(year), parseInt(month), parseInt(day))
    return new Date(resultDate)
}

export function toScrumdappDate(date: Date) {
    return `${date.getFullYear()}-${parseStr(date.getMonth()+1)}-${parseStr(date.getDate())}`
}

function parseStr(i: number): string {
    let s = i.toString()
    while (s.length < 2) {
        s = "0"+s
    }
    return s
}
