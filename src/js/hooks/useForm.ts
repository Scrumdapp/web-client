import {ChangeEvent, useState} from "react";

/**
 *
 * @remarks
 * Took elements and inspiration from (https://medium.com/@ignatovich.dm/building-a-custom-form-handling-solution-in-react-with-typescript-and-zod-39d484cfb8ad)
 */
export function useForm<T>(initialValues: T) {

    const [values, setValues] = useState(initialValues);
    //const [valErrors, setValErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (key: keyof T) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setValues({...values, [key]: event.target.value });
    };

    const handleSubmit = (onSubmit: (values: T) => void) =>
        (event: { preventDefault: () => void; })=> {
        event.preventDefault();
        onSubmit(values);
    };

    // const validateForm

    return {
        values,
        setValues,
        handleChange,
        handleSubmit
    }
}
