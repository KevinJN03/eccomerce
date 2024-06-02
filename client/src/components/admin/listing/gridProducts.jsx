import { useAdminContext } from '../../../context/adminContext';
import { useListingPageContext } from '../../../context/listingPageContext';
import { v4 as uuidv4 } from 'uuid';
import GridItem from './gridItem';
import EmptyListing from './emptylisting';
import _ from 'lodash';

function GridProduct() {
    const { selectionSet, setSelectionSet, products, loading } =
        useListingPageContext();
    return (
        <section className="flex w-full flex-row flex-wrap gap-4">
            {loading ? (
                <>
                    {Array(5)
                        .fill(uuidv4())
                        .map((item, idx) => {
                            return (
                                <div
                                    key={`${item}-${idx}`}
                                    className="h-60 w-full max-w-48 rounded border border-dark-gray/50   p-0.5"
                                >
                                    <div className="h-40 w-full rounded-t bg-orange-200/10"></div>
                                </div>
                            );
                        })}
                </>
            )  : !_.isEmpty(products) ? (
                <>
                    {products.map((product, index) => {
                        return (
                            <GridItem
                                product={product}
                                key={product._id}
                                index={index}
                            />
                        );
                    })}
                </>
            ) :  _.isEmpty(products) && !loading && (
                <EmptyListing />
            )}
        </section>
    );
}

export default GridProduct;
