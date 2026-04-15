import * as React from "react";

interface ModalActionRowProps {
    children?: React.ReactNode
}

export default function ModalActionRow({children}: ModalActionRowProps) {
    return (
        <div className="flex justify-end gap-2">{children}</div>
    )
}