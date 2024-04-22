import { Fragment } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import _ from 'lodash';

function AddressContainer({ country }) {
    const { orderInfo } = useAdminOrderContext();
    return (
        <section className="flex flex-row justify-between gap-10 rounded-sm border-[1px] p-4">
            <div className="left flex-[1]">
                <p className="mb-1 text-xs text-gray-700/70">Deliver to</p>
                <p className="text-xs font-medium">
                    {orderInfo.shipping_address?.name}
                </p>

                <p className="text-xxs">
                    {orderInfo.shipping_address?.address?.line1}
                </p>
                {orderInfo.shipping_address?.address?.line2 && (
                    <p className="text-xxs">
                        {orderInfo.shipping_address?.address?.line2}
                    </p>
                )}
                <p className="text-xxs">{`${orderInfo.shipping_address?.address?.city}, ${orderInfo.shipping_address?.address?.state}`}</p>
                <p className="text-xxs">
                    {orderInfo.shipping_address?.address?.postal_code}
                </p>

                <p className="text-xxs">{country}</p>
            </div>
            <div className="right flex flex-[3] flex-col gap-1">
                <p className="text-xs text-gray-700/70">Selected by buyer</p>

                {[..._.get(orderInfo, 'itemsByProfile')].map(
                    ({ items, shippingInfo, _id }) => {
                        return (
                            <Fragment key={_id}>
                                <p className="flex w-full justify-between text-xs font-medium">
                                    {_.get(shippingInfo, 'shipping.service')}{' '}
                                    <span className="text-xs">
                                        £
                                        {parseFloat(
                                            _.get(shippingInfo, 'cost')
                                        )?.toFixed(2)}
                                    </span>
                                </p>
                                <div className="flex flex-col gap-3">
                                    {items?.map(
                                        (
                                            { _id, images, title, quantity },
                                            idx
                                        ) => {
                                            return (
                                                <div
                                                    className="flex flex-row gap-3"
                                                    key={_id}
                                                >
                                                    <img
                                                        src={images[0]}
                                                        className="h-8 w-8 rounded-md object-cover"
                                                        alt=""
                                                    />
                                                    <div className="flex w-full flex-row flex-nowrap justify-between">
                                                        <p className="text-xs text-gray-700/70 ">
                                                            {title}
                                                        </p>
                                                        <p className="flex flex-nowrap gap-2 text-xs text-gray-700/70">
                                                            Qty{' '}
                                                            <span className=" text-gray-700/70">
                                                                {quantity}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </Fragment>
                        );
                    }
                )}
            </div>
        </section>
    );
}

export default AddressContainer;
