import { useState } from 'react';
import Customer_Info from '../../checkout/address form/customer-info';
import DeleteButton from '../delete-btn';
import EditButton from '../edit-btn';
import axios from '../../../api/axios';
import { useUserDashboardContext } from '../../../context/userContext';
function Address_Item({
    idx,
    addressItem,
    handleDelete,
    handleEdit,
    isDefaultShippingAddress,
    isDefaultBillingAddress,
    setLoading,
}) {
    const { setDefaultAddresses } = useUserDashboardContext();
    const [billingCheck, setBillingCheck] = useState(false);
    const [shippingCheck, setShippingCheck] = useState(false);
    const handleCheck = async (setState, { state, property }) => {
        try {
            setLoading(true);
            setState(!state);
            const data = { [property]: addressItem._id };

            const result = await axios.put('user/address/changeDefault', data);

            setDefaultAddresses(() => result.data.default_address);
            setTimeout(() => {
                setLoading(false);
            }, 1000);

            return;
        } catch (error) {
            console.log('error at changingDefault: ', error);
        }
    };
    return (
        <section
            key={addressItem._id}
            className="mt-2 flex flex-row justify-between bg-white px-4 py-8"
        >
            <div className="left">
                <Customer_Info
                    customer={addressItem}
                    elementClass={'text-base'}
                />

                {
                    <div className="mt-4 flex flex-col gap-y-3">
                        {!isDefaultShippingAddress ? (
                            <div className="flex items-center justify-start gap-x-2">
                                <input
                                    type="checkbox"
                                    checked={shippingCheck}
                                    className="daisy-checkbox rounded-none border-[1px] border-black"
                                    onChange={() =>
                                        handleCheck(setShippingCheck, {
                                            state: shippingCheck,
                                            property: 'shipping_address',
                                        })
                                    }
                                />
                                <p>Set as default delivery address</p>
                            </div>
                        ) : (
                            <p>This is your default delivery address</p>
                        )}
                        {!isDefaultBillingAddress ? (
                            <div className="m-0 flex items-center justify-start gap-x-2 p-0">
                                <input
                                    type="checkbox"
                                    checked={billingCheck}
                                    className="daisy-checkbox rounded-none border-[1px] border-black"
                                    onChange={() =>
                                        handleCheck(setBillingCheck, {
                                            state: billingCheck,
                                            property: 'billing_address',
                                        })
                                    }
                                />
                                <p>Set as default billing address</p>
                            </div>
                        ) : (
                            <p>This is your default billing address</p>
                        )}
                    </div>
                }
            </div>
            <div className="right flex flex-col gap-y-4">
                <EditButton handleEdit={() => handleEdit(addressItem._id)} />

                <DeleteButton
                    handleDelete={() => handleDelete(addressItem._id)}
                    isDefault={isDefaultShippingAddress}
                />
            </div>
        </section>
    );
}

export default Address_Item;
