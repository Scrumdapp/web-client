interface ModalHeadTextProps {
    children?: string
}

export default function ModalHeadText({children}: ModalHeadTextProps) {
    return (
        <h2 className="text-fg mb-4">{children}</h2>
    )
}
