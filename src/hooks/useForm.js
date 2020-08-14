import { useState } from 'react';

function useForm(initialState = {}) {
    const [state, setState] = useState(initialState);

    const onChange = evt =>
        setState({
            ...state,
            [evt.target.name]: evt.target.value,
        });

    const onToggle = evt =>
        setState({
            ...state,
            [evt.target.name]: evt.target.checked,
        });

    return { state, onChange, onToggle, setState };
}

export default useForm;
