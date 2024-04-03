import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useAdminContext } from '../../../context/adminContext';
import { useEffect, useState } from 'react';
import VerticalItem from './veritcalItem/verticalItem';
import { useListingPageContext } from '../../../context/listingPageContext';
import { v4 as uuidv4 } from 'uuid';
function VerticalProducts() {
    const { allProducts } = useAdminContext();
    const { selectionSet, setSelectionSet, checks, products, loading } =
        useListingPageContext();

    return (
        <section className="w-full ">
            {loading ? (
                <>
                    {Array(5)
                        .fill(uuidv4())
                        .map((item, idx) => {
                            return (
                                <div
                                    key={`${item}-${idx}`}
                                    className="h-28 w-full border border-dark-gray/50 bg-transparent px-4 py-5"
                                ></div>
                            );
                        })}
                </>
            ) : (
                <>
                    {products?.map((product, index) => {
                        return (
                            <VerticalItem
                                key={product._id}
                                product={product}
                                index={index}
                            />
                        );
                    })}
                </>
            )}
        </section>
    );
}

export default VerticalProducts;
