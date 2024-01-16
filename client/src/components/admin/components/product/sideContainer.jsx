import { GridViewSharp, MenuSharp } from '@mui/icons-material';
import { Switch, styled, colors, alpha } from '@mui/material';
import { green, pink } from '@mui/material/colors';

function SideContainer({}) {
    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: green[600],
            '&:hover': {
                backgroundColor: alpha(
                    green[600],
                    theme.palette.action.hoverOpacity
                ),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: green[600],
        },

        '.MuiSwitch-thumb': {
            color: green[800],
        },
    }));

    return (
        <section className=" right w-full flex-1 flex flex-col gap-3">
            <button
                disabled
                className=" w-full rounded border border-dark-gray/50 py-2 text-center text-sm font-medium text-black/75 hover:bg-light-grey/50 disabled:bg-orange-50/50 "
            >
                Quick Edit
            </button>

            <div className="flex flex-nowrap">
                <div className="left flex w-full flex-col items-start">
                    <p className='font-semibold'>Stats</p>

                    <section className="flex w-full flex-row flex-nowrap justify-between">
                        <GreenSwitch defaultChecked />

                        <div className="flex flex-row flex-nowrap items-center rounded border border-dark-gray/50">
                            <span className="flex h-full items-center justify-center border-r border-dark-gray/50 px-3">
                                <GridViewSharp />
                            </span>

                            <span className="flex h-full items-center justify-center px-3">
                                <MenuSharp />
                            </span>
                        </div>
                    </section>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-semibold">Sort</p>

                <select
                    className="daisy-select daisy-select-sm !rounded border border-dark-gray/50"
                    name="sort-product"
                    id="sort-product"
                >
                    <optgroup label="Select a sort order" className="text-xs">
                        <option value="">Title: A to Z</option>
                        <option value="">Title: Z to A</option>

                        <option value="">Stock: low to high</option>
                        <option value="">Stock: high to low</option>

                        <option value="">Price: low to high</option>
                        <option value="">Price: high to low</option>
                    </optgroup>
                </select>
            </div>

            <div className='flex gap-2 flex-col'>
                <p className="font-semibold ">Listing Status</p>

                <div className="flex flex-col gap-2">
                    {['Active', 'Draft', 'Sold Out', 'Inactive'].map((item) => {
                        return (
                            <div className="flex flex-row flex-nowrap gap-2">
                                <input
                                    type="radio"
                                    className="daisy-radio daisy-radio-xs"
                                    name="listing-status"
                                />
                                <p className='text-xxs'>{item}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-row flex-nowrap gap-2">
                <input type="checkbox" name="featured" id="featured" />
                <p>Featured listings</p>
            </div>

            <div className='w-full flex flex-col gap-2'>
                <p className="flex flex-nowrap justify-between">
                    <span  className="font-semibold">Sections</span>

                    <span className="text-xxs">Manage</span>
                </p>

                <select name="sections" id="sections" className='daisy-select daisy-select-sm !rounded border border-dark-gray/50 w-full'>
                    <optgroup label='Sections'>
                        <option>All</option>

                        {[1, 2, 3].map((item) => {
                            return(<option value={item}>{item}</option>);
                        })}
                    </optgroup>
                </select>
            </div>

            <div className='w-full flex flex-col gap-2'>
                <p className="flex flex-nowrap justify-between">
                    <span className="font-semibold">Delivery Profiles</span>

                    <span className="text-xxs">Manage</span>
                </p>

                <select name="sections" id="sections" className='daisy-select daisy-select-sm !rounded border border-dark-gray/50 w-full'>
                    <optgroup label='Sections'>
                        <option>All</option>

                        {[1, 2, 3].map((item) => {
                            return(<option value={item}>{item}</option>);
                        })}
                    </optgroup>
                </select>
            </div>
        </section>
    );
}

export default SideContainer;
