import { useEffect, useRef, useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import OrderItem from './orderItem';
import _ from 'lodash';
import GLoader from '../../../Login-SignUp/socialRegister/gloader';

function SearchOrder({}) {
    const {
        setSearchingOrder,
        setSearchText,
        searchData,
        setSearchData,
        searchDataLoading,
        setTriggerFetchData,
        setLoading,
    } = useAdminOrderContext();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const clearSearch = () => {
        setSearchingOrder(() => false);
        setSearchText(() => '');
        setSearchData(() => ({}));

        setLoading(() => true);
        setTriggerFetchData((prevState) => !prevState);
    };

    return (
        <section className="search-order flex w-full flex-row flex-nowrap gap-7 p-5">
            <section className="left flex flex-[4] flex-col gap-2">
                {searchDataLoading ? (
                    <div className="mt-14 flex justify-center">
                        <GLoader />
                    </div>
                ) : (
                    <>
                        <div className="banner flex w-full items-center justify-between rounded border-[1px] bg-green-100 p-4">
                            <p className="text-sm font-semibold">
                                {_.get(searchData, 'searchResult.length')}{' '}
                                orders matching "
                                {_.get(searchData, 'searchText')}" across all
                                your progress steps
                            </p>
                            <p
                                className="cursor-pointer text-xxs text-black/95 underline underline-offset-1 hover:text-gray-700/70 "
                                onClick={clearSearch}
                            >
                                Clear search
                            </p>
                        </div>

                        <div className="search-result-container rounded border-[1px]">
                            {_.get(searchData, 'searchResult')?.map(
                                (order, idx) => {
                                    return (
                                        <OrderItem
                                            order={order}
                                            disableCheckBox
                                            lastOrderInArray={
                                                _.get(
                                                    searchData,
                                                    'searchResult.length'
                                                ) -
                                                    1 ==
                                                idx
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                    </>
                )}
            </section>
            <section className="right flex flex-1"></section>
        </section>
    );
}

export default SearchOrder;
