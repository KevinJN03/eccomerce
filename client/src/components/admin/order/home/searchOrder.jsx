import { useEffect, useRef, useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import OrderItem from './orderItem';
import _ from 'lodash';
import GLoader from '../../../portal/socialRegister/gloader';
import { Pagination } from '@mui/material';

function SearchOrder({}) {
    const {
        setSearchingOrder,
        setSearchText,
        searchData,
        setSearchData,

        setTriggerFetchData,
        setLoading,
        currentPage,
        setCurrentPage,
        setSearchDataLoading,
        fetchSearchData,
        searchParams,
        setSearchParams,
        loading,
        handleChangePageNumber,
    } = useAdminOrderContext();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const clearSearch = () => {
        setCurrentPage(() => 1);
        setSearchingOrder(() => false);
        setSearchText(() => '');
        setSearchData(() => ({}));
        searchParams.delete('searchText');
        setSearchParams(searchParams);
        setLoading(() => true);
        setTriggerFetchData((prevState) => !prevState);
    };

    const maxPage = _.get(searchData, 'maxPage');

    return (
        <section className="search-order flex w-full flex-row flex-nowrap gap-7 p-5">
            <section className="left flex flex-[4] flex-col gap-2">
                {loading ? (
                    <div className="mt-14 flex justify-center">
                        <GLoader />
                    </div>
                ) : (
                    <>
                        <div className="banner flex w-full items-center justify-between rounded border-[1px] bg-green-100 p-4">
                            <p className="text-sm font-semibold">
                                {_.get(searchData, 'totalCount')} orders
                                matching "{_.get(searchData, 'searchText')}"
                                across all your progress steps
                            </p>
                            <a
                                className="cursor-pointer text-xxs text-black/95 underline underline-offset-1 hover:text-gray-700/70 "
                                onClick={clearSearch}
                            >
                                Clear search
                            </a>
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

                        {maxPage > 1 && (
                            <Pagination
                                page={currentPage}
                                onChange={(e, value) => {
                                    handleChangePageNumber(value);
                                    // setLoading(() => true);
                                    // fetchSearchData(value);
                                    // setCurrentPage(() => value);
                                }}
                                count={maxPage}
                                variant="outlined"
                                shape="rounded"
                                className="mb-8"
                            />
                        )}
                    </>
                )}
            </section>
            <section className="right flex flex-1"></section>
        </section>
    );
}

export default SearchOrder;
