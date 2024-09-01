import { KeyboardBackspaceRounded } from '@mui/icons-material';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import saleIcon from '../../../assets/icons/shopping.png';
import saleIcon2 from '../../../assets/icons/promo-code.png';

function OfferTypes({}) {
    const { setModalOpen, offerType, setOfferType } = useSalesDiscountContext();
    return (
        <section className="mt-6 flex w-full flex-nowrap gap-4">
            {[
                {
                    icon: saleIcon,
                    title: 'Create a gift card',
                    description: `Gift cards are a wonderful way to offer your customers a flexible and thoughtful gifting option. With a gift card, customers can choose their own perfect present from your store`,
                    className: '-rotate-45',
                    type: 'gift_card',
                },
                {
                    icon: saleIcon2,
                    title: 'Create a promo code',
                    description: `
        Share your code with customers, and they can apply it for a discount at checkout`,
                    type: 'promo_code',
                },
            ].map(({ icon, title, description, className, type }) => {
                return (
                    <div
                        onClick={() => {
                            // setDetails((prevState) => ({
                            //     ...prevState,
                            //     offer_type: type,
                            // }));

                            setOfferType(() => type);

                            setModalOpen(() => true);
                        }}
                        className="group flex flex-1 cursor-pointer flex-nowrap gap-5 rounded-xl border border-dark-gray p-6 transition-all hover:shadow-my-shadow"
                    >
                        <img
                            src={icon}
                            className={`h-14 w-14 object-cover ${className || ''}`}
                            alt=""
                            srcset=""
                        />

                        <div className="flex h-full flex-col gap-2">
                            <div>
                                <h3 className="mb-1 text-base font-semibold">
                                    {title}
                                </h3>
                                <p className="text-sm">{description}</p>
                            </div>

                            <button
                                type="button"
                                className="mt-auto flex flex-nowrap items-center gap-2"
                            >
                                <p className="text-base font-medium">Set up</p>
                                <div className="transition-all !duration-500 ease-in-out group-hover:!translate-x-2">
                                    <KeyboardBackspaceRounded className="!rotate-180 " />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

export default OfferTypes;
