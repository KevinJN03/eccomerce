import { Link } from 'react-router-dom';
function Variation2Options({ options, label, type, select, handleOnChange }) {
    return (
        <span id="variation2-option">
            <label htmlFor="qty-size-select">{label}</label>
            <select
                onChange={handleOnChange}
                name="variation-select"
                id="variation-select"
                className="!max-w-[80px] text-s text-black/70"
            >
                {options.map((item, index) => {
                    return (
                        <option
                            className="text-black/60"
                            key={item.id}
                            data-id={item?.id}
                            data-variation={item?.variation}
                            selected={item.variation == select ? true : false}
                        >
                            {item?.variation}
                        </option>
                    );
                })}
            </select>
        </span>
    );
}

export default Variation2Options;
