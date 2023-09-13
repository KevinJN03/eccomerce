import '../new_product.scss';
export default function CategorySelect({ options, title }) {
    return (
        <select className="category-select select outline">
            <option disabled selected>
                {title}
            </option>
            {options.map((option, index) => {
                // console.log("index: ", index)
                return (
                    <>
                        <option key={index} value={option}>
                            {option}
                        </option>
                    </>
                );
            })}
        </select>
    );
}
