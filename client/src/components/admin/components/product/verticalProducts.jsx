import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useAdminContext } from '../../../../context/adminContext';
import { useState } from 'react';
import VerticalItem from './verticalItem';

function VerticalProducts({ selectionSet, setSelectionSet }) {
    const { allProducts } = useAdminContext();


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
