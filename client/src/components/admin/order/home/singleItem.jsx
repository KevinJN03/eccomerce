import { Fragment } from "react";
import {v4 as uuidV4 } from 'uuid'
function SingleItem({ itemObj }) {
    return (
        <div className="single-item mt-2 flex flex-row gap-3 border-black">
            <img
                className="h-16 w-16 rounded-sm object-cover object-center"
                src={itemObj.images[0]}
                alt=""
            />
            <div className="product-order-info flex max-w-[400px] flex-col gap-[2px] ">
                <p className="text-xs">{itemObj.title}</p>

                <p className="mt-2 text-xs !text-primary/80 text-xs">
                    Quantity{' '}
                    <span className="font-semibold">{itemObj?.quantity}</span>
                </p>
                {[itemObj?.variation1, itemObj?.variation2].map(
                    ({ title, variation }) => {
                        return (
                            <Fragment key={uuidV4()}>
                                {variation && (
                                    <p className="!text-primary/80 text-xs">
                                        {title} <span className="text-xs">{variation}</span>
                                    </p>
                                )}
                            </Fragment>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default SingleItem;
