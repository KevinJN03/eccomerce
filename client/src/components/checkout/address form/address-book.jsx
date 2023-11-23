import Address_Form from './address-form';
import Address_Item from './address-item';

function Address_Book({
    loading,
    addressFormProps,
    editAddress,
    handleNewAddress,
    setChange,
    newAddress,
    sortAddresses,
    viewDispatch,
    addressItemProps,
}) {
    return (
        <section className="flex flex-col gap-y-6">
            {sortAddresses.map((address, idx) => {
                const props = {
                    address,
                    ...addressItemProps,
                };

                return <Address_Item {...props} key={address._id} />;
            })}

            <div className="flex flex-row justify-between">
                <button
                    disabled={loading}
                    onClick={handleNewAddress}
                    className="!bg-primary px-4 py-2 font-bold tracking-wider text-white transition-all hover:!bg-black disabled:cursor-not-allowed"
                >
                    ADD NEW ADDRESS
                </button>
                <button
                    disabled={loading}
                    id="checkout-change-btn"
                    onClick={() => viewDispatch({ type: 'main' })}
                >
                    CANCEL
                </button>
            </div>
        </section>
    );
}

export default Address_Book;
