import '../new_product.scss';

import { v4 as uuidV4 } from 'uuid';
export default function CategorySelect({
    options,
    title,
    setState,
    state,
    isCategory,
}) {
    const handleChange = (e) => {
        setState(e.target.value);
    };
    return (
        <select
            id="options"
            name="options"
            className="category-select daisy-select input my-0 !min-w-[160px] !rounded-md outline"
            defaultValue={title}
            value={state}
            onChange={handleChange}
        >
            <option disabled key={uuidV4()}>
                {title}
            </option>
            {options.map((option, index) => {
                //
                return (
                    <option
                        key={index}
                        value={isCategory ? option._id : option.toLowerCase()}
                    >
                        {isCategory ? option.name.toUpperCase() : option}
                    </option>
                );
            })}
        </select>
    );
}

// selected={state === option}
