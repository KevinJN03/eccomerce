import dayjs from 'dayjs';
import _ from 'lodash';

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

    const generateTime = () => {
        const timeObj = {
            start: dayjs().date(),
            end: 0,
        };
        const generateValue = ({ field }) => {
            // adding processing time together with shipping time to calculate estimated delivery time frame.
            [_.get(delivery, `processing_time`), shipping].forEach((prop) => {
                if (prop?.type == 'weeks') {
                    timeObj[field] += _.get(prop, field) * 7;
                } else if (_.get(prop, `type`) == 'days') {
                    timeObj[field] += _.get(prop, field);
                }
            });
        };

        generateValue({
            field: 'end',
        });
        generateValue({
            field: 'start',
        });
        return dayjs()
            .add(timeObj.end, 'day')
            .format(`${timeObj.start}-D MMM`)
            .toString();
    };
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
                        ${generateTime()}
                    
                    ,



${_.get(shipping, 'service')})`}
                </>
            }
        </option>
    );
}

export default ShippingSelectOption;
