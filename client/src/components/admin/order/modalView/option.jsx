import { KeyboardArrowDownRounded } from '@mui/icons-material';

function Option({
    title,
    description,
    handleClick,
    showOption,
    printChecks,
    setPrintChecks,
    property,
}) {
    return (
        <div className="flex w-full flex-row">
            <input
                onChange={() =>
                    setPrintChecks((prevState) => ({
                        ...prevState,
                        [property]: !prevState?.[property],
                    }))
                }
                checked={printChecks?.[property]}
                type="checkbox"
                className="daisy-checkbox daisy-checkbox-xs rounded"
            />
            <div className="ml-2 flex w-full flex-col">
                <p className="text-xs font-medium">{title}</p>
                <p className="text-xs text-black/80">{description}</p>
            </div>

            {!showOption && printChecks?.[property] && (
                <button
                    onClick={handleClick}
                    type="button"
                    className="flew-row flex h-fit flex-nowrap items-start !justify-end gap-1"
                >
                    <p className="whitespace-nowrap underline-offset-1 hover:underline ">
                        Customize options
                    </p>
                    <KeyboardArrowDownRounded className="relative top-[-2px]" />
                </button>
            )}
        </div>
    );
}

export default Option;
