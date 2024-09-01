import { CloseRounded } from '@mui/icons-material';
import _ from 'lodash';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useOfferContext } from '../../../context/offerContext';

function Table({ disableDelete }) {
    const { setCategories, chosenListings, setChosenListings,handleDeleteListing } =
        useOfferContext();
    return (
        <table className="w-full">
            <colgroup>
                {[
                    {
                        width: '10%',
                        bg: 'bg-red-100',
                    },

                    {
                        width: '35%',
                        bg: 'bg-yellow-100 ',
                    },

                    {
                        width: '25%',
                        bg: 'bg-blue-100',
                    },
                    {
                        width: '25%',
                        bg: 'bg-green-100',
                    },

                    {
                        width: '5%',
                        bg: 'bg-orange-100',
                    },
                ].map(({ width, bg }, idx) => {
                    return (
                        <col
                            key={`${v4()}-${width}-${idx}`}
                            width={width}
                            className={`${'bg'}`}
                        />
                    );
                })}
            </colgroup>
            <thead>
                <tr>
                    {Array(5)
                        .fill('')
                        .map((item, idx) => {
                            return (
                                <th
                                    className=""
                                    key={`${v4()}-table-header-${idx}`}
                                />
                            );
                        })}
                </tr>
            </thead>

            <tbody>
                {chosenListings.map(
                    ({ _id: categoryId, name, listings }, categoryIdx) => {
                        // const listings = [...men, ...women];

                        return (
                            <Fragment key={categoryId}>
                                {listings.length > 0 && (
                                    <Fragment>
                                        <tr>
                                            <td
                                                className="relative py-2"
                                                colspan="5"
                                            >
                                                <p className=" whitespace-nowrap text-sm font-semibold">
                                                    {`Listings from ${_.upperFirst(name)} (${listings?.length || 0})`}
                                                </p>
                                            </td>
                                        </tr>

                                        {listings.map((item, listingIdx) => {
                                            const {
                                                _id,
                                                images: [image],
                                                title,
                                                additional_data,
                                            } = item;
                                            const isAllSamePrice =
                                                _.get(
                                                    additional_data,
                                                    'price.min'
                                                ) ==
                                                _.get(
                                                    additional_data,
                                                    'price.max'
                                                );

                                            const stock = _.get(
                                                additional_data,
                                                'stock.total'
                                            );
                                            return (
                                                <tr
                                                    key={_id}
                                                    className="border"
                                                >
                                                    <td className="p-2">
                                                        <div className=" w-fit rounded-sm border border-dark-gray p-0.5">
                                                            <img
                                                                src={image}
                                                                alt=""
                                                                srcset=""
                                                                className="h-12 w-12 min-w-12 object-cover"
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="">
                                                        <Link
                                                            to={`/admin/products/edit/${_id}`}
                                                            target="_blank"
                                                            className=" block max-w-xs cursor-pointer truncate whitespace-nowrap text-sm font-semibold underline-offset-1 transition-all hover:underline "
                                                        >
                                                            {title}
                                                        </Link>
                                                    </td>

                                                    <td>
                                                        <p className=" flex-1 text-center text-sm">
                                                            {`${
                                                                !_.get(
                                                                    additional_data,
                                                                    'price.min'
                                                                )
                                                                    ? '--'
                                                                    : isAllSamePrice
                                                                      ? parseFloat(
                                                                            _.get(
                                                                                additional_data,
                                                                                'price.min'
                                                                            )
                                                                        ).toLocaleString(
                                                                            'en-GB',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'GBP',
                                                                            }
                                                                        )
                                                                      : `${parseFloat(
                                                                            _.get(
                                                                                additional_data,
                                                                                'price.min'
                                                                            )
                                                                        ).toLocaleString(
                                                                            'en-GB',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'GBP',
                                                                            }
                                                                        )} - ${parseFloat(
                                                                            _.get(
                                                                                additional_data,
                                                                                'price.max'
                                                                            )
                                                                        ).toLocaleString(
                                                                            'en-GB',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'GBP',
                                                                            }
                                                                        )}`
                                                            }`}
                                                        </p>
                                                    </td>

                                                    <td align="">
                                                        <p className=" flex-1 text-sm">
                                                            {!stock
                                                                ? '--'
                                                                : `${_.get(additional_data, 'stock.total')} in stock`}
                                                        </p>
                                                    </td>
                                                    <td align="">
                                                        {!disableDelete && (
                                                            <button
                                                                type="button"
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    handleDeleteListing(
                                                                        {
                                                                            listing:
                                                                                item,
                                                                            categoryId,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <CloseRounded className="!fill-dark-gray" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {/* </section> */}
                                    </Fragment>
                                )}
                            </Fragment>
                        );
                    }
                )}{' '}
            </tbody>
        </table>
    );
}

export default Table;
