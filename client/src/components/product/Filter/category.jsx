import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Arrow from './arrow';
function Category({ loading }) {
    const [count, setCount] = useState();
    const [show, setShow] = useState(true);

    const toggleShow = () => {
        setShow(!show);
    };
    const categories = [
        { id: uuidv4(), value: 'Men Graphic Tees' },
        { id: uuidv4(), value: 'Men Graphic Tees' },
        { id: uuidv4(), value: 'Men Graphic Tees' },
        { id: uuidv4(), value: 'Men Graphic Tees' },
        { id: uuidv4(), value: 'Men Graphic Tees' },
    ];

    let toggleClass = show ? 'up-arrow' : 'down-arrow';
    return (
        <section id="category-section">
            {!loading ? (
                <>
                    <div className="section-header">
                        <h3 className="section-title">
                            {count ? `Category (${count})` : 'Category'}
                        </h3>
                        <div className="arrow-wrapper" onClick={toggleShow}>
                            <Arrow show={show} />
                        </div>
                    </div>
                    {show ? (
                        <div className="category-wrapper">
                            {categories.map((category) => {
                                return (
                                    <div
                                        key={category.id}
                                        className="category-checkbox-wrapper"
                                    >
                                        <input
                                            type="checkbox"
                                            value={category.value}
                                            id={category.value}
                                        />
                                        <label htmlFor={category.value}>
                                            {category.value}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <div className="skeleton-pulse h-full min-h-[200px] w-full"></div>
            )}
        </section>
    );
}

export default Category;
