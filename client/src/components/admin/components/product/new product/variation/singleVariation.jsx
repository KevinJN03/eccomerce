import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

function SingleVariation({ singleVariation }) {
    const { id, name, options } = singleVariation;
    return (
        <section className="single-variation border-1 rounded-lg p-3 flex flex-col gap-2">
            <h2 className='font-medium'>{name}</h2>
            <p className='text-xs'>
                {options.length} {options.length > 1 ? 'options' : 'option'}
            </p>

            <div className="flex flex-row justify-between w-full items-center">
                <span className="flex flex-row gap-2 w-full flex-nowrap overflow-hidden single-variation-options">
                    {options.length > 0 &&
                        options.map(({ variation, id }) => {
                            return (
                                <p
                                    key={id}
                                    className="border-1 font-medium  rounded-full flex justify-center items-center h-6 py-3 px-4"
                                >
                                    {variation}
                                </p>
                            );
                        })}
                </span>
                <div className='flex flew-row flex-nowrap gap-x-2 ml-8'>

              <span>
                  <EditRoundedIcon  className='single-variation-btn'/>
              </span>
              <span>
                   <DeleteRoundedIcon className='single-variation-btn' fontSize='small'/>
              </span>
             
                </div>
            </div>
        </section>
    );
}

export default SingleVariation;
