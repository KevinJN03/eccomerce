import { useState } from 'react';
import Category from './category.jsx';
import Color from './color.jsx';
import Size from './size.jsx';

function Index({ filterCount, setFilterCount, loading }) {
    return (
        <section id="filter-nav">
            {filterCount > 0 ? (
                <button
                    type="button"
                    className="filter-btn"
                    onClick={() => setFilterCount((count) => 0)}
                >
                    Clear all ({filterCount})
                </button>
            ) : null}
            <Size addToFilter={setFilterCount} loading={loading} />
            <Color loading={loading} />
            <Category loading={loading} />
        </section>
    );
}

export default Index;
