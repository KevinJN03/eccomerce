import { useElements } from '@stripe/react-stripe-js';
import axios from '../../api/axios';
import { useCart } from '../../context/cartContext';
import { useCheckoutContext } from '../../context/checkOutContext';

function Buy_Now_Btn({ disable }) {
    const { isOrderSubmit, setOrderSubmit, billingAddress, shippingAddress } =
        useCheckoutContext();

    const { cart } = useCart();

    const elements = useElements();

    const submitOrder = () => {
        setOrderSubmit(() => true);
        console.log('elements: ', elements.getElement('cardCvc'));
        axios
            .post('/order/create', {
                billingAddress,
                shippingAddress,
                cart,
            })
            .then((res) => {
                console.log({ res });
                setTimeout(() => {
                    setOrderSubmit(() => false);
                }, 2000);
            })
            .catch((error) => {
                setTimeout(() => {
                    setOrderSubmit(() => false);
                }, 2000);
                console.log('error when creating order: ', error);
            });
    };
    return (
        <>
            {' '}
            <button
                className=" flex h-14 max-h-20 w-11/12 items-center justify-center self-center bg-primary-green font-gotham font-bold text-white opacity-95 transition-all hover:opacity-100 disabled:opacity-40"
                type="button"
                onClick={submitOrder}
                disabled={disable}
            >
                {isOrderSubmit ? (
                    <svg
                        className="spinner-ring spinner-sm !m-0 !p-0 [--spinner-color:var(--test123)]"
                        viewBox="25 25 50 50"
                        strokeWidth="5"
                    >
                        <circle cx="50" cy="50" r="20" />
                    </svg>
                ) : (
                    <span className="text-white">BUY NOW</span>
                )}
            </button>
            <p className="mb-12 w-11/12 self-center">
                By placing your order you agree to our Terms & Conditions,
                privacy and returns policies . You also consent to some of your
                data being stored by GLAMO, which may be used to make future
                shopping experiences better for you.
            </p>
        </>
    );
}

export default Buy_Now_Btn;
