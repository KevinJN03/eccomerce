import { useAdminContext } from '../../../../context/adminContext';
import GridItem from './gridItem';

function GridProduct({ selectionSet, setSelectionSet }) {
    const { allProducts } = useAdminContext();
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
