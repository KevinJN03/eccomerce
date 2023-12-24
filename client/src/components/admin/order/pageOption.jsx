import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
function PageOptions({}) {
    return (
        <section className="flex w-full flex-row items-center justify-end gap-3 px-5 py-3">
            <select className="select w-full max-w-[220px] rounded-sm border-[1px] border-dark-gray font-semibold">
                {[20, 35, 50].map((value) => {
                    return (
                        <option
                            value={value}
                        >{`${value} orders per page`}</option>
                    );
                })}
            </select>
            <div className="flex flex-row items-center gap-2">
                <p className="text-base">Page</p>
                <select
                    name="page"
                    id="page-select"
                    className="rounded-sm border-[1px] border-dark-gray p-2 "
                >
                    {[1, 2].map((value) => {
                        return <option value={value}>{value}</option>;
                    })}
                </select>
            </div>
            <p className="text-base">of 2</p>
            <div className="flex flex-row items-center gap-5">
                <ArrowBackIosRoundedIcon />
                <ArrowForwardIosRoundedIcon />
            </div>
        </section>
    );
}

export default PageOptions;
