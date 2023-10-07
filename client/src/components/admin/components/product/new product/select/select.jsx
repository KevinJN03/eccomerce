import '../new_product.scss';

import { v4 as uuidV4 } from 'uuid';
export default function CategorySelect({ options, title, setState }) {
    return (
        <select
            className="category-select select my-0 !min-w-[160px] outline"
            onChange={(e) => setState(e.target.value)}
        >
            <option disabled selected key={uuidV4()}>
                {title}
            </option>
            {options.map((option, index) => {
                // console.log("index: ", index)
                return (
                    <option key={index} value={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
}
