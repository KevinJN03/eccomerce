import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
function PageOptions({}) {
    const {
        orderPerPage,
        setOrderPerPage,
        currentPage,
        setCurrentPage,
        ordersData,
        allOrderIds,
        fetchData,
        setLoading
    } = useAdminOrderContext();
    const maxPage = _.get(ordersData, 'maxPage');

    const previousPage = () => {
        if (currentPage == 1) {
            return;
        }

        // setCurrentPage(() => currentPage - 1);
        setLoading(() => true)

        fetchData(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage == maxPage) {
            return;
        }
        setLoading(() => true)

        // setCurrentPage(() => currentPage + 1);
        fetchData(currentPage + 1);
        // setCurrentPage((prevPage) => prevPage + 1);
    };
    return (
        <section className="flex w-full flex-row items-center justify-end gap-3  py-3">
            <select
                onChange={(e) => setOrderPerPage(parseInt(e.target.value))}
                className="daisy-select daisy-select-bordered daisy-select-sm !h-9 !rounded-sm border-dark-gray text-sm font-semibold !outline-none"
            >
                {[5, 10, 20, 35, 50].map((value) => {
                    return (
                        <option
                            value={value}
                            selected={value == orderPerPage}
                        >{`${value} orders per page`}</option>
                    );
                })}
            </select>
            {maxPage > 1 && (
                <>
                    {' '}
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-sm">Page</p>
                        <select
                            onChange={(e) => {
                                // setCurrentPage(() => parseInt(e.target.value));
                                setLoading(() => true)

                                fetchData(e.target.value);
                            }}
                            name="page"
                            id="page-select"
                            className="daisy-select daisy-select-bordered daisy-select-xs !h-9 min-w-12 !rounded-sm border-dark-gray py-2  !text-sm "
                        >
                            {Array(maxPage)
                                .fill('')
                                .map((value, idx) => {
                                    return (
                                        <option
                                        className='!text-sm'
                                            value={idx + 1}
                                            selected={idx + 1 == currentPage}
                                            key={`page-select-${idx + 1}`}
                                        >
                                            {idx + 1}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <p className="text-sm">of {maxPage}</p>
                    <div className="flex flex-row items-center gap-4">
                        <button
                            onClick={previousPage}
                            disabled={currentPage == 1}
                            className="disabled:opacity-50"
                        >
                            <ArrowBackIosRoundedIcon className="!fill-dark-gray !text-lg hover:!fill-dark-gray/90" />
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage == maxPage}
                            className="disabled:opacity-50"
                        >
                            <ArrowForwardIosRoundedIcon className="!fill-dark-gray !text-lg hover:!fill-dark-gray/90" />
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default PageOptions;
