import { GridViewSharp, MenuSharp } from '@mui/icons-material';
import { Switch, styled, colors, alpha } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import { useListingPageContext } from '../../../context/listingPageContext';
import { useAdminContext } from '../../../context/adminContext';
import { useEffect, useState } from 'react';
import { adminAxios } from '../../../api/axios.js';
import UserLogout from '../../../hooks/userLogout';
import _, { property } from 'lodash';

function SideContainer({}) {
    const {
        checks,
        setChecks,
        categoryQuantity,

        deliveryProfile,
        deliveryQuantityMap,
        setSearchParams,
        searchParams,
    } = useListingPageContext();
    const { allProducts } = useAdminContext();
    const { logoutUser } = UserLogout();
    const [categoryArray, setCategories] = useState([]);

    useEffect(() => {
        adminAxios
            .get('category/all')
            .then(({ data }) => {
                setCategories(() =>
                    data.map(({ _id, name }) => ({ _id, name }))
                );
            })
            .catch((error) => {
                console.error({ error });
                logoutUser({ error });
            });
    }, []);

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

        searchParams.set('order', value);
        searchParams.set('sort_by', dataset.title);

        setSearchParams(searchParams);
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
                        <GreenSwitch
                            defaultChecked
                            checked={checks?.stats}
                            onChange={() =>
                                setChecks(({ stats, ...prevState }) => {
                                    const newValue = !stats;
                                    if (newValue) {
                                        searchParams.set('stats', newValue);
                                    } else {
                                        searchParams.delete('stats');
                                    }
                                    setSearchParams(searchParams);

                                    return { ...prevState, stats: newValue };
                                })
                            }
                        />

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
                                        onClick={() => {
                                            setChecks((prevChecks) => ({
                                                ...prevChecks,
                                                format: label,
                                            }));

                                            if (label == 'vertical') {
                                                searchParams.set(
                                                    'format',
                                                    label
                                                );
                                            } else {
                                                searchParams.delete('format');
                                            }
                                            setSearchParams(searchParams);
                                        }}
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
                    className="daisy-select daisy-select-bordered daisy-select-sm !rounded  border-dark-gray/50 text-s"
                    name="sort-product"
                    id="sort-product"
                >
                    <optgroup
                        label="Select a sort order"
                        className="font-semibold"
                    >
                        {[
                            {
                                text: `Title: A to Z`,
                                title: 'title',
                                value: 1,
                            },

                            {
                                text: `Title: Z to A`,
                                title: 'title',
                                value: -1,
                            },

                            {
                                text: `Stock: low to high`,
                                title: 'additional_data.stock.total',
                                value: 1,
                            },
                            {
                                text: `Stock: high to low`,
                                title: 'additional_data.stock.total',
                                value: -1,
                            },
                            {
                                text: `Price: low to high`,
                                title: 'additional_data.price.max',
                                value: 1,
                            },
                            {
                                text: `Price: high to low`,
                                title: 'additional_data.price.max',
                                value: -1,
                            },
                        ].map(({ text, value, title }) => {
                            return (
                                <option
                                    value={value}
                                    data-title={title}
                                    selected={
                                        _.get(checks, ['sort', title]) == value
                                    }
                                >
                                    {text}
                                </option>
                            );
                        })}
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
                            <div
                                onClick={() => {
                                    if (
                                        allProducts[lowerCaseText]?.length >= 1
                                    ) {
                                        setChecks((prevState) => ({
                                            ...prevState,
                                            listing_status: lowerCaseText,
                                        }));

                                        searchParams.set(
                                            'listing_status',
                                            lowerCaseText
                                        );
                                        setSearchParams(searchParams);
                                    }
                                }}
                                className="flex w-fit cursor-pointer flex-row flex-nowrap gap-2"
                            >
                                <input
                                    readOnly
                                    checked={
                                        checks?.listing_status == lowerCaseText
                                    }
                                    type="radio"
                                    className="daisy-radio daisy-radio-xs "
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

            <div
                className="flex w-fit cursor-pointer flex-row flex-nowrap gap-2 "
                onClick={() => {
                    setChecks((prevChecks) => {
                        const newValue = !prevChecks?.featured;

                        if (newValue) {
                            searchParams.set('featured', newValue);
                        } else {
                            searchParams.delete('featured');
                        }
                        setSearchParams(searchParams);

                        return {
                            ...prevChecks,
                            featured: newValue,
                        };
                    });
                }}
            >
                <input
                    className="daisy-checkbox daisy-checkbox-xs !rounded-sm "
                    type="checkbox"
                    name="featured"
                    id="featured"
                    readOnly
                    checked={checks?.featured}
                />
                <p>Featured listings</p>
            </div>
            {[
                {
                    title: 'Sections',
                    options: categoryArray,
                    property: 'category',
                    quantityObj: categoryQuantity,
                },
                {
                    title: 'Delivery Profiles',
                    options: _.orderBy(
                        deliveryProfile,
                        [
                            function ({ _id }) {
                                return deliveryQuantityMap?.[_id] || 0;
                            },
                        ],
                        ['desc']
                    ),
                    property: 'deliveryProfile',
                    quantityObj: deliveryQuantityMap,
                },
            ].map(({ title, options, property, quantityObj }) => {
                return (
                    <div key={title} className="flex w-full flex-col gap-2">
                        <p className="flex flex-nowrap justify-between">
                            <span className="font-semibold">{title}</span>

                            <span className="text-xxs">Manage</span>
                        </p>

                        <select
                            onChange={(e) => {
                                setChecks((prevState) => ({
                                    ...prevState,
                                    [property]: e.target.value,
                                }));

                                if (e.target.value == 'All') {
                                    searchParams.delete(property);
                                } else {
                                    searchParams.set(property, e.target.value);
                                }
                                setSearchParams(searchParams);
                            }}
                            name="sections"
                            id="sections"
                            className="daisy-select daisy-select-bordered daisy-select-sm w-full !rounded border-dark-gray/50"
                        >
                            <optgroup
                                label="Sections"
                                className="text-s font-medium"
                            >
                                <option
                                    selected={!checks?.[property]}
                                    className="text-xs"
                                >
                                    All
                                </option>

                                {options.map(({ _id, name }) => {
                                    return (
                                        <option
                                            disabled={!quantityObj?.[_id]}
                                            className="text-xs"
                                            selected={checks?.[property] == _id}
                                            value={_id}
                                        >
                                            {`${name[0].toUpperCase() + name.slice(1)} (${
                                                quantityObj?.[_id] || 0
                                            })`}
                                        </option>
                                    );
                                })}
                            </optgroup>
                        </select>
                    </div>
                );
            })}

            <div className="h-70"></div>
        </section>
    );
}

export default SideContainer;
