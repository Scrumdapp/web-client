import * as React from "react";

interface ModalButtonRowProps {
    children?: React.ReactNode
}

export default function ModalButtonRow({children}: ModalButtonRowProps) {
    return (
        <div className="flex justify-end gap-2">{children}</div>
    )
}