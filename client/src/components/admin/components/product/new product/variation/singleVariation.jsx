import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { getValuesFromMap } from './variationData';
import { useState } from 'react';
function SingleVariation({
    deleteVariation,
    editVariation,
    options: optionsMap,
    name,
    _id,
    ...props
}) {
    const [options, setOptions] = useState(getValuesFromMap(optionsMap));

    return (
        <section className="single-variation mb-2 flex flex-col gap-1 rounded-lg !border-[1.5px] border-gray-300 px-3 py-2">
            <h2 className="text-sm font-medium">{name}</h2>
            <p className="text-xs">
                {options && options.length}{' '}
                {options && options.length > 1 ? 'options' : 'option'}
            </p>

            <div className="flex w-full flex-row items-center justify-between">
                <span className="single-variation-options flex w-full flex-row flex-nowrap gap-2 overflow-hidden">
                    {options &&
                        options.length > 0 &&
                        options.map(({ variation, id }) => {
                            return (
                                <p
                                    key={id}
                                    className="flex h-4 items-center  justify-center whitespace-nowrap rounded-full border-[1px] px-2 py-3 text-xxs font-medium"
                                >
                                    {variation}
                                </p>
                            );
                        })}
                </span>
                <div className="flew-row ml-8 flex flex-nowrap gap-x-2">
                    <span
                        onClick={() =>
                            editVariation({ ...props, _id, options, name })
                        }
                    >
                        <EditRoundedIcon className="single-variation-btn" />
                    </span>
                    <span onClick={() => deleteVariation(_id)}>
                        <DeleteRoundedIcon
                            className="single-variation-btn"
                            fontSize="small"
                        />
                    </span>
                </div>
            </div>
        </section>
    );
}

export default SingleVariation;
