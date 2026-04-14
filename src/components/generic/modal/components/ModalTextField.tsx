import {useState} from "react";

interface ModalTextFieldProps {
    children?: string | undefined
}

export default function ModalTextField({children}: ModalTextFieldProps) {
    const [name, setName] = useState("")
    return (
        <input value={name} onChange={(e) => setName(e.target.value)}
               type="text"
               placeholder={children}
               className="w-full p-3 rounded-lg mb-4 outline-none border"
        />
    )
}