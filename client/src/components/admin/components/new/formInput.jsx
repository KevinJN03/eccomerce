import { forwardRef } from 'react';

const FormInput = forwardRef(function Input(
    { inputInfo, setState, content, value, className },
    ref
) {
    return (
        <div className="formInput relative">
            <label>{inputInfo.label}</label>
            <input
                type={inputInfo.type}
                placeholder={inputInfo.placeholder}
                value={value}
                className={className}
                required
                onChange={(e) => setState(e.target.value)}
                ref={ref}
            />
            {content}
        </div>
    );
});

export default FormInput;
