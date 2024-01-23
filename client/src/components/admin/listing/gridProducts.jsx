import { useAdminContext } from '../../../context/adminContext';
import { useListingPageContext } from '../../../context/listingPageContext';
import GridItem from './gridItem';

function GridProduct() {
    const { selectionSet, setSelectionSet, products } = useListingPageContext();
    return (
        <section className="flex w-full flex-row flex-wrap gap-4 overflow-y-hidden">
            {products.map((product, index) => {
                return <GridItem product={product} key={product._id} index={index} />;
            })}
        </section>
    );
}

export default GridProduct;
