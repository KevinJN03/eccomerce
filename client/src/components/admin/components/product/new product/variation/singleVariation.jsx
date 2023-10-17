import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { getValuesFromMap } from './variationData';
import { useState } from 'react';
function SingleVariation({ singleVariation, deleteVariation, editVariation }) {
    const { id, name } = singleVariation;

    const [options, setOptions] = useState(getValuesFromMap(singleVariation.options))

   
    return (
        <section className="single-variation border-1 rounded-lg py-2 px-3 flex flex-col gap-1 mb-2">
            <h2 className='font-medium text-sm'>{name}</h2>
            <p className='text-xs'>
                { options && options.length} {options && options.length > 1 ? 'options' : 'option'}
            </p>

            <div className="flex flex-row justify-between w-full items-center">
                <span className="flex flex-row gap-2 w-full flex-nowrap overflow-hidden single-variation-options">
                    { options && options.length > 0 &&
                        options.map(({ variation, id }) => {
                            return (
                                <p
                                    key={id}
                                    className="border-1 font-medium text-xxs  rounded-full flex justify-center items-center h-4 px-2 py-3 whitespace-nowrap"
                                >
                                    {variation}
                                </p>
                            );
                        })}
                </span>
                <div className='flex flew-row flex-nowrap gap-x-2 ml-8'>

              <span onClick={editVariation }>
                  <EditRoundedIcon  className='single-variation-btn'/>
              </span>
              <span onClick={deleteVariation}>
                   <DeleteRoundedIcon className='single-variation-btn' fontSize='small' />
              </span>
             
                </div>
            </div>
        </section>
    );
}

export default SingleVariation;
