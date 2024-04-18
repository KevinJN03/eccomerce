import dayjs from 'dayjs';
import _ from 'lodash';
import generateEstimatedTime from '../admin/components/product/new product/utils/generateEstimateTime';

function ShippingSelectOption({
    _id,
    charges,
    shipping,
    iso_code,
    cartItem,
    delivery,
}) {
    const cost = parseFloat(
        _.get(cartItem, 'quantity') == 1
            ? _.get(charges, 'one_item')
            : _.get(charges, 'one_item') +
                  _.get(charges, 'additional_item') *
                      (_.get(cartItem, 'quantity') - 1)
    ).toFixed(2);
    return (
        <option
            selected={_.get(cartItem, 'shipping_data.id') == _id}
            data-cost={cost}
            data-id={_id}
            data-one_item={_.get(charges, 'one_item')}
            data-additional_item={_.get(charges, 'additional_item')}
            data-profile_id={_.get(delivery, '_id')}
            key={`${cartItem?._id}-delivery-option-${_id}`}
        >
            {
                <>
                    {`£${cost} (
                        ${generateEstimatedTime({ delivery, shipping })}
                    
                    ,



${_.get(shipping, 'service')})`}
                </>
            }
        </option>
    );
}

export default ShippingSelectOption;
