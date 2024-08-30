import { property } from 'lodash';
import { useCart } from '../../context/cartContext';
import calculatePromo from '../utils/calculatePromo';
import PromoSavings from './promoSavings';
import { Box, Modal } from '@mui/material';
function MultiplePromo({ setCheck, check, setShow }) {
    const { promo, setPromo, total, updateItemProperty } = useCart();

    const handleClick = (item) => {
        setPromo(() => [item]);

        updateItemProperty({ property: item?.promoType, value: item?._id });
        updateItemProperty({
            property: item?.promoType == 'coupon' ? 'giftCard' : 'coupon',
            value: null,
        });

        setCheck(() => false);
        setShow(() => false);
    };

    return (
        <Modal open={check}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',

                    transform: 'translate(-50%, -50%)',
                    boxSizing: 'border-box',
                    maxWidth: '500px',
                    width: '100%',

                    borderRadius: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'white',

                    border: 'none',
                }}
            >
                <div className=" flex w-full flex-col !gap-7 gap-5 !rounded-none border-none p-8">
                    <h2 className="mb-2 self-center font-gotham text-3xl">
                        MULTIPLE PROMO CODES
                    </h2>
                    <span className="mt-0 text-sm">
                        Sorry, you can only use one promo code per order. What
                        would you like to do?
                    </span>

                    <div className="">
                        {promo.map((item, idx) => {
                            const { savePercent, amountOff } = calculatePromo(
                                item,
                                total?.withOutShipping
                            );

                            return (
                                <div
                                    className="flex flex-col gap-y-4"
                                    key={`${item._id}-${idx}`}
                                >
                                    <PromoSavings
                                        promo={item}
                                        savePercent={savePercent}
                                        amountOff={amountOff}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleClick(item)}
                                        className="mb-4 w-full border-2 py-2 text-center font-gotham text-lg hover:bg-[#f9f9f9] hover:shadow-sm"
                                    >{`USE ${item.code}`}</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default MultiplePromo;
