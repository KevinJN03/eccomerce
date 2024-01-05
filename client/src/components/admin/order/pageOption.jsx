import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useAdminOrderContext } from '../../../context/adminOrder';
import { v4 as uuidv4 } from 'uuid';
function PageOptions({}) {
    const { orderPerPage, setOrderPerPage, numberOfPage } =
        useAdminOrderContext();

        const previousPage = () => {

        }

        const nextPage = () => {

        }
    return (
        <section className="flex w-full flex-row items-center justify-end gap-3 px-5 py-3">
            <select
                onChange={(e) => setOrderPerPage(parseInt(e.target.value))}
                className="select w-full max-w-[220px] rounded-sm border-[1px] border-dark-gray font-semibold"
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
            {numberOfPage > 1 && (
                <>
                    {' '}
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-base">Page</p>
                        <select
                            name="page"
                            id="page-select"
                            className="rounded-sm border-[1px] border-dark-gray p-2 "
                        >
                            {[...Array(numberOfPage).keys()].map((value) => {
                                return (
                                    <option value={value + 1} key={uuidv4()}>
                                        {value + 1}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <p className="text-base">of {numberOfPage}</p>
                    <div className="flex flex-row items-center gap-5">
                        <ArrowBackIosRoundedIcon />
                        <ArrowForwardIosRoundedIcon />
                    </div>
                </>
            )}
        </section>
    );
}

export default PageOptions;
