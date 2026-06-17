import {useState} from "react";

export default function useTempValue<T>(): {
    visibility: boolean,
    content: T,
    showContent: (content: T, ms: number) => void
} {
    const [visibility, setVisibility] = useState(false);
    const [content, setContent] = useState<T>();

    const showContent = (content: T, ms: number): void => {
        setVisibility(true);
        setContent(content);

        setTimeout(() => {
            setVisibility(false);
        }, ms);
    };

    return {
        visibility,
        // @ts-ignore
        content,
        showContent
    };
}
