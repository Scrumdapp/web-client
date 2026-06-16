import {useState} from "react";

export default function useTempValue(): {
    visibility: boolean,
    content: any,
    showContent: (content: any, ms: number) => void
} {
    const [visibility, setVisibility] = useState(false);
    const [content, setContent] = useState(null);

    const showContent = (content: any, ms: number): void => {
        setVisibility(true);
        setContent(content);

        setTimeout(() => {
            setVisibility(false);
        }, ms);
    };

    return {
        visibility,
        content,
        showContent
    };
}