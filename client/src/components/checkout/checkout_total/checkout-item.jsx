import { Link } from 'react-router-dom';
import _ from 'lodash';
function Checkout_Item({
    className,

    data,
}) {
    const select = {
        variation1: _.get(data, 'variation_data.select.variation1.variation'),
        variation2: _.get(data, 'variation_data.select.variation2.variation'),
    };

    return (
        <div className={`${className || ''} flex flex-row gap-5`}>
            <Link
                to={`/product/${data?.product_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={_.get(data, 'images.0')}
                    className="h-28 w-28 object-contain object-center"
                />
            </Link>

            <span className="product-info-container text-inherit">
                <h3 className="font-bold tracking-wide text-inherit">
                    £{_.get(data, 'price.current')}
                </h3>
                <p id="product-title" className="text-xs text-inherit">
                    {_.get(data, 'title')}
                </p>
                <span className="flex flex-row gap-x-3 font-bold text-inherit">
                    {select.variation1 && (
                        <p className="text-inherit">{select.variation1}</p>
                    )}
                    {select.variation2 && (
                        <p className="text-inherit">{select.variation2}</p>
                    )}
                </span>
                <p className="text-inherit">
                    Qty:{' '}
                    <span className="font-bold text-inherit">
                        {_.get(data, 'quantity')}
                    </span>
                </p>
            </span>
        </div>
    );
}

export default Checkout_Item;
