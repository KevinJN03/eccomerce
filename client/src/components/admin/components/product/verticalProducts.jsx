import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useAdminContext } from '../../../../context/adminContext';
import { useEffect, useState } from 'react';
import VerticalItem from './verticalItem';
import { useListingPageContext } from '../../../../context/listingPageContext';

function VerticalProducts() {
    const { allProducts } = useAdminContext();
    const { selectionSet, setSelectionSet, drafts, checks } =
        useListingPageContext();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (checks?.listing_status == 'draft') {
            setProducts(() => drafts);
        } else if (checks?.listing_status == 'active') {
            setProducts(() => allProducts);
        }
    }, [checks?.listing_status]);

    return (
        <section className="w-full ">
            {products?.map((product, idx) => {
                return (
                    <VerticalItem
                        key={product._id}
                        {...{ product, selectionSet, setSelectionSet, idx }}
                    />
                );
            })}
        </section>
    );
}

export default VerticalProducts;
