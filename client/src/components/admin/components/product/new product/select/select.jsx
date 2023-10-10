import '../new_product.scss';

import { v4 as uuidV4 } from 'uuid';
export default function CategorySelect({ options, title, setState, state}) {
    const handleChange = (e) => {
        console.log({e: e.target.value})
        setState(e.target.value);
    };
    return (
        <select
            className="category-select select my-0 !min-w-[160px] outline"
            defaultValue={title}
            value={state}
            onChange={handleChange}
        >
            <option disabled selected key={uuidV4()}>
                {title}
            </option>
            {options.map((option, index) => {
                // console.log("index: ", index)
                return (
                    <option key={index} value={option}  >
                        {option}
                    </option>
                );
            })}
        </select>
    );
}

// selected={state === option}