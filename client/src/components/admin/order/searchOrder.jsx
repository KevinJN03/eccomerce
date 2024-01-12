import { useEffect, useState } from 'react';
import { useAdminOrderContext } from '../../../context/adminOrder';
import OrderItem from './orderItem';

function SearchOrder({}) {
    const { searchResult, setSearchingOrder, searchText } =
        useAdminOrderContext();
    const [searchedTerm, setSearchTerm] = useState(searchText);

    useEffect(() => {
        setSearchTerm(() => searchText);
    }, [searchResult]);
    return (
        <section className="search-order flex w-full flex-row flex-nowrap p-5">
            <section className="left flex flex-[4] flex-col gap-2">
                <div className="banner flex w-full items-center justify-between rounded border-[1px] bg-green-100 p-4">
                    <p className="text-sm font-semibold">
                        {searchResult.length} orders matching "{searchedTerm}"
                        across all your progress steps
                    </p>
                    <p
                        className="text-xxs text-black/95 underline underline-offset-1 hover:text-gray-700/70 "
                        onClick={() => setSearchingOrder(false)}
                    >
                        Clear search
                    </p>
                </div>

                <div className="search-result-container rounded border-2">
                    {searchResult.map((order, idx) => {
                        return <OrderItem order={order} disableCheckBox lastOrderInArray={searchResult.length - 1  == idx} />;
                    })}
                </div>
            </section>
            <section className="right flex flex-1"></section>
        </section>
    );
}

export default SearchOrder;
