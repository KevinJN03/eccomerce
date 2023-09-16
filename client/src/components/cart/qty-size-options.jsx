import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

function QTY_SIZE_OPTION({ options, label, type, selectSize }) {
    return (
        <span id="qty-size-option">
            <label htmlFor="qty-size-select">{label}</label>
            <select name="quantity-select" id="qty-size-select">
                {options.map((num, index) => {
                    return (
                        <option
                            key={index}
                            value={type == 'size' ? num.size : num}
                            selected={num.size == selectSize}
                        >
                            {type == 'size' ? num.size : num}
                        </option>
                    );
                })}
            </select>
        </span>
    );
}

export default QTY_SIZE_OPTION;