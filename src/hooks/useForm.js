import { useState } from 'react';

function useForm(initialValues = {}) {
    const [form, setValues] = useState(initialValues);

    const onChange = evt =>
        setValues({
            ...form,
            [evt.target.name]: evt.target.value,
        });

    const onToggle = evt =>
        setValues({
            ...form,
            [evt.target.name]: evt.target.checked,
        });

    return { form, onChange, onToggle };
}

export default useForm;
