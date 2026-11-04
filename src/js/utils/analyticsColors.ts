// Same 4 colors as the "Herontwerp — WCAG-kleuren" mockup. Amber vs coral is
// close for color-blind users, so every color is always paired with an icon
// or text label (WCAG 1.4.1: color is never the only signal).
export const chartColors = {
    olive: "#b7c62e", // present / on time / "yes"
    amber: "#e2953f", // late / mood-score line
    gray: "#8d8b86", // sick / unknown / neutral
    coral: "#f2705c", // absent / "no"
} as const

// Chart.js can't read Tailwind classes, so these mirror the theme.css colors
export const chartChrome = {
    card: "#1d2021", // bg_h, the .card background
    grid: "#3c3836", // bg1
    axis: "#928374", // gray, >=3:1 against the card, for average/reference lines
    mutedText: "#a89984", // fg4
}

export const chartTooltipStyle = {
    backgroundColor: "#282828", // bg
    titleColor: "#fbf1c7", // fg
    bodyColor: chartChrome.mutedText,
    borderColor: chartChrome.grid,
    borderWidth: 1,
    padding: 8,
}

export const calendarColors = {
    present: chartColors.olive,
    late: chartColors.amber,
    sick: chartColors.gray,
    absent: chartColors.coral,
} as const
