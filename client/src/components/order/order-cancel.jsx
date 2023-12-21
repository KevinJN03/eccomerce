import { useState } from 'react';
import Template from './template';
import { OrderInfo } from './order-success';
import cancelOptions from './cancelOptions';

function OrderCancel({}) {
    const [order, setOrder] = useState({});
    return (
        <Template>
            <section className="flex flex-row flex-nowrap gap-x-3 ">
                <div className="left flex max-w-[580px] flex-1 flex-col flex-nowrap">
                    <div className=" bg-white px-8 py-6">
                        <h3 className="mb-4 font-gotham text-lg tracking-wider !text-primary">
                            CANCEL YOUR ORDER
                        </h3>

                        <div className="mt-6 flex flex-col gap-y-3">
                            <OrderInfo
                                header={'ORDER TOTAL:'}
                                text={
                                    order?.transaction_cost?.total
                                        ? `£ ${parseFloat(
                                              order.transaction_cost?.total
                                          ).toFixed(2)}`
                                        : ''
                                }
                            />
                            <OrderInfo
                                header={'ORDER REFERENCE:'}
                                text={order?._id}
                                headerClassName={'w-5'}
                            />

                            <OrderInfo
                                header={'ORDER STATUS:'}
                                text={
                                    order?.status
                                        ? `${order.status[0].toUpperCase()}${order.status?.slice(
                                              1
                                          )}`
                                        : ''
                                }
                            />
                        </div>
                        <section className="w-8/12">
                            <h6 className="mt-2 font-gotham text-sm !text-gray-500 text-opacity-5">
                                REASON FOR CANCELLATION
                            </h6>
                            <select
                                type="text"
                                className="mt-2 w-full border-2 p-2 text-s"
                            >
                                <option value="Please Select" selected disabled>
                                    Please Select
                                </option>
                                {cancelOptions.map((value, index) => {
                                    return (
                                        <option value={value} key={index}>
                                            {value}
                                        </option>
                                    );
                                })}
                            </select>
                            <h6 className="mt-7 font-gotham text-sm !text-gray-500 text-opacity-5" >
                                ADDITIONAL INFORMATION
                            </h6>
                            <textarea
                           maxLength={"500"}
                         rows={'8'}
                                className="text-s p-2 resize-none  border-2 mt-2 w-full rounded-none"
                                placeholder="Optional - max 500 characters"
                            />
                        </section>


                        <button type='button' className='!bg-primary'>CANCEL ORDER</button>
                    </div>
                </div>
            </section>
        </Template>
    );
}

export default OrderCancel;
