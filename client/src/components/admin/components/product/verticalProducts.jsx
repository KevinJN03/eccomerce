import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useAdminContext } from '../../../../context/adminContext';
import { useState } from 'react';
import VerticalItem from './verticalItem';
import { useListingPageContext } from '../../../../context/listingPageContext';

function VerticalProducts() {
    const { allProducts } = useAdminContext();
    const { selectionSet, setSelectionSet } = useListingPageContext();

    return (
        <section className="w-full ">
            {allProducts.map((product, idx) => {
                return (
                    <VerticalItem
                        {...{ product, selectionSet, setSelectionSet, idx }}
                    />
                );
            })}
        </section>
    );
}

export default VerticalProducts;
