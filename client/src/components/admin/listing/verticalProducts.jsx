import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useAdminContext } from '../../../context/adminContext';
import { useEffect, useState } from 'react';
import VerticalItem from './verticalItem';
import { useListingPageContext } from '../../../context/listingPageContext';

function VerticalProducts() {
    const { allProducts } = useAdminContext();
    const { selectionSet, setSelectionSet, checks, products } =
        useListingPageContext();

    return (
        <section className="w-full ">
            {products?.map((product, index) => {
                return (
                    <VerticalItem
                        key={product._id}
                        product={product}
                        index={index}
                    />
                );
            })}
        </section>
    );
}

export default VerticalProducts;
