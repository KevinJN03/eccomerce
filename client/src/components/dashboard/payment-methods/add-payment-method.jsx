import info_icon from '../../../assets/icons/information-icon.png';
import card_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Divider from '../divider';
import useCurrentLocation from '../../../hooks/useCurrentLocation';
function Button({ text, icon, onClick, alt, description }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="transistion-all relative mt-3 flex h-14 w-4/6 flex-row items-center justify-center gap-x-3 border-2 hover:bg-grey-100"
        >
            <img src={icon} alt={alt} className="absolute left-3 h-9 w-9" />
            <span className="flex flex-col justify-center">
                <p className="text-center text-base font-bold">{text}</p>
                {description && <p className="h-0 basis-full">{description}</p>}
            </span>
        </button>
    );
}

function Add_Payment_Method({}) {
    const navigate = useNavigate();

    const { currentLocation } = useCurrentLocation();

    return (
        <section className="add-payment-method bg-white p-4">
            {currentLocation == 'add' ? (
                <>
                    {' '}
                    <h2 className="mb-2 text-xl font-bold">
                        {'ADD PAYMENT METHOD'}
                    </h2>
                    <span className="flex flex-row items-center gap-x-4">
                        <img
                            src={info_icon}
                            alt="black information icon with transparent background"
                            className="h-6 w-6"
                        />
                        <p>
                            You currently have no saved payment methods. Get
                            started by adding one.
                        </p>
                    </span>
                    <div className="mt-4 flex flex-col !items-center">
                        <Button
                            icon={card_icon}
                            text={'CREDIT/DEBIT CARD'}
                            alt={'black card icon with transparent background'}
                            onClick={() => navigate('card')}
                        />

                        <Divider />

                        <Button
                            icon={paypal_icon}
                            text={'PAYPAL'}
                            alt={'black card icon with transparent background'}
                        />

                        <Button
                            icon={paypal_icon}
                            text={'PAYPAL'}
                            alt={'black card icon with transparent background'}
                            description={'with PayPal Pay Later'}
                        />
                        <Button
                            icon={klarna_logo}
                            text={'PAY LATER'}
                            alt={'black card icon with transparent background'}
                            description={'with Klarna'}
                        />
                    </div>
                </>
            ) : (
                <Outlet />
            )}
        </section>
    );
}

export default Add_Payment_Method;
