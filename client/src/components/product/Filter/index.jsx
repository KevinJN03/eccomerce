import { useState } from 'react';
import Category from './category.jsx';
import Color from './color.jsx';
import Size from './size.jsx';

function Index() {
    const [filterCount, setFilterCount] = useState(0);
    return (
        <section id="filter-nav">
            {filterCount > 0 ? (
                <button type="button" className="filter-btn">
                    Clear all ({filterCount})
                </button>
            ) : null}
            <Size addToFilter={setFilterCount} />
            <Color />
            <Category />
        </section>
    );
}

export default Index;
