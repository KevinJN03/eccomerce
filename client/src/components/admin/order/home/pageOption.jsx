import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { v4 as uuidv4 } from 'uuid';
function PageOptions({}) {
    const {
        orderPerPage,
        setOrderPerPage,
        numberOfPage,
        currentPage,
        setCurrentPage,
        resultMap,
    } = useAdminOrderContext();

    const previousPage = () => {
        if (currentPage == 1) {
            return;
        }

        setCurrentPage((prevPage) => prevPage - 1);
    };

    const nextPage = () => {
        if (currentPage == resultMap?.size) {
            return;
        }

        setCurrentPage((prevPage) => prevPage + 1);
    };
    return (
        <section className="flex w-full flex-row items-center justify-end gap-3  py-3">
            <select
                onChange={(e) => setOrderPerPage(parseInt(e.target.value))}
                className="daisy-select daisy-select-sm !h-9 !rounded-sm daisy-select-bordered border-dark-gray text-xs font-semibold !outline-none"
            >
                {[20, 35, 50].map((value) => {
                    return (
                        <option
                            value={value}
                            selected={value == orderPerPage}
                        >{`${value} orders per page`}</option>
                    );
                })}
            </select>
            {resultMap?.size > 1 && (
                <>
                    {' '}
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-xs">Page</p>
                        <select
                            onChange={(e) =>
                                setCurrentPage(parseInt(e.target.value))
                            }
                            name="page"
                            id="page-select"
                            className="daisy-select daisy-select-xs !h-9 w-12 !rounded-sm daisy-select-bordered border-dark-gray p-2 text-xs "
                        >
                            {[...Array(resultMap?.size).keys()].map((value) => {
                                return (
                                    <option
                                        value={value + 1}
                                        selected={value + 1 == currentPage}
                                        key={uuidv4()}
                                    >
                                        {value + 1}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <p className="text-xs">of {resultMap?.size}</p>
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
                            disabled={currentPage == resultMap?.size}
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
