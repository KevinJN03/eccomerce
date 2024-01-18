import { useAdminContext } from '../../../../context/adminContext';
import { useListingPageContext } from '../../../../context/listingPageContext';
import GridItem from './gridItem';

function GridProduct() {
    const { allProducts } = useAdminContext();

    const { selectionSet, setSelectionSet } = useListingPageContext();
    return (
        <section className="flex w-full flex-row flex-wrap gap-4 overflow-y-hidden">
            {allProducts.map((product) => {
                return (
                    <GridItem
                        {...{
                            product,
                            setSelectionSet,
                            selectionSet,
                        }}
                    />
                );
            })}
        </section>
    );
}

export default GridProduct;
