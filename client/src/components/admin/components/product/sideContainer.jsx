import { GridViewSharp, MenuSharp } from '@mui/icons-material';
import { Switch, styled, colors, alpha } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import { useListingPageContext } from '../../../../context/listingPageContext';
import { useAdminContext } from '../../../../context/adminContext';

function SideContainer({}) {
    const { checks, setChecks } = useListingPageContext();
    const { allProducts } = useAdminContext();

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

    const handleSort = (e) => {
        const { dataset, value } = e.target[e.target.selectedIndex];
        console.log(value, dataset);

        setChecks((prevChecks) => ({
            ...prevChecks,
            sort: { [dataset.title]: value },
        }));
    };

    return (
        <section className=" right flex w-full flex-1 flex-col gap-3">
            <button
                disabled
                className=" w-full rounded border border-dark-gray/50 py-2 text-center text-sm font-medium text-black/75 hover:bg-light-grey/50 disabled:bg-orange-50/50 "
            >
                Quick Edit
            </button>

            <div className="flex flex-nowrap">
                <div className="left flex w-full flex-col items-start">
                    <p className="font-semibold">Stats</p>

                    <section className="flex w-full flex-row flex-nowrap justify-between">
                        <GreenSwitch defaultChecked />

                        <div
                            className={` flex cursor-pointer flex-row flex-nowrap items-center rounded border border-dark-gray/50`}
                        >
                            {[
                                {
                                    icon: <GridViewSharp />,
                                    label: 'grid',
                                    className: 'rounded-l',
                                },
                                {
                                    icon: <MenuSharp />,
                                    label: 'vertical',
                                    className: 'rounded-r-inherit',
                                },
                            ].map(({ icon, label, className }) => {
                                return (
                                    <span
                                        onClick={() =>
                                            setChecks((prevChecks) => ({
                                                ...prevChecks,
                                                format: label,
                                            }))
                                        }
                                        className={` ${className} ${
                                            checks?.format == label
                                                ? 'bg-light-grey'
                                                : 'bg-white'
                                        } flex h-full cursor-pointer items-center justify-center px-3`}
                                    >
                                        {icon}
                                    </span>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-semibold">Sort</p>

                <select
                    onChange={handleSort}
                    className="daisy-select daisy-select-sm !rounded border border-dark-gray/50"
                    name="sort-product"
                    id="sort-product"
                >
                    <optgroup label="Select a sort order" className="text-xs">
                        <option value={1} data-title="title">
                            Title: A to Z
                        </option>
                        <option value={-1} data-title="title">
                            Title: Z to A
                        </option>

                        <option data-title="stock" value={1}>
                            Stock: low to high
                        </option>
                        <option data-title="stock" value={-1}>
                            Stock: high to low
                        </option>

                        <option data-title="price" value={1}>
                            Price: low to high
                        </option>
                        <option value={-1} data-title="price">
                            Price: high to low
                        </option>
                    </optgroup>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-semibold ">Listing Status</p>

                <div className="flex flex-col gap-2">
                    {[
                        { text: 'Active' },
                        { text: 'Draft' },
                        { text: 'Sold Out' },
                        { text: 'Inactive' },
                    ].map(({ text }) => {
                        const lowerCaseText = text
                            .replaceAll(' ', '')
                            .toLowerCase();

                        return (
                            <div className="flex flex-row flex-nowrap gap-2">
                                <input
                                    onChange={() => {
                                        setChecks((prevState) => ({
                                            ...prevState,
                                            listing_status: lowerCaseText,
                                        }));
                                    }}
                                    checked={
                                        checks?.listing_status == lowerCaseText
                                    }
                                    type="radio"
                                    className="daisy-radio daisy-radio-xs"
                                    name="listing-status"
                                    disabled={
                                        !allProducts[lowerCaseText]?.length
                                    }
                                />
                                <p className={`text-xxs`}>
                                    <span
                                        className={`text-xxs ${
                                            !allProducts[lowerCaseText]?.length
                                                ? 'text-dark-gray'
                                                : ''
                                        }`}
                                    >
                                        {text}
                                    </span>

                                    <span className="ml-1 font-semibold text-black/60">
                                        {allProducts[lowerCaseText]?.length ||
                                            0}
                                    </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-row flex-nowrap gap-2">
                <input type="checkbox" name="featured" id="featured" />
                <p>Featured listings</p>
            </div>

            <div className="flex w-full flex-col gap-2">
                <p className="flex flex-nowrap justify-between">
                    <span className="font-semibold">Sections</span>

                    <span className="text-xxs">Manage</span>
                </p>

                <select
                    name="sections"
                    id="sections"
                    className="daisy-select daisy-select-sm w-full !rounded border border-dark-gray/50"
                >
                    <optgroup label="Sections">
                        <option>All</option>

                        {[1, 2, 3].map((item) => {
                            return <option value={item}>{item}</option>;
                        })}
                    </optgroup>
                </select>
            </div>

            <div className="flex w-full flex-col gap-2">
                <p className="flex flex-nowrap justify-between">
                    <span className="font-semibold">Delivery Profiles</span>

                    <span className="text-xxs">Manage</span>
                </p>

                <select
                    name="sections"
                    id="sections"
                    className="daisy-select daisy-select-sm w-full !rounded border border-dark-gray/50"
                >
                    <optgroup label="Sections">
                        <option>All</option>

                        {[1, 2, 3].map((item) => {
                            return <option value={item}>{item}</option>;
                        })}
                    </optgroup>
                </select>
            </div>
            <div className="h-70"></div>
        </section>
    );
}

export default SideContainer;
