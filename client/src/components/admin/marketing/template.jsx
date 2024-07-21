import saleIcon from '../../../assets/icons/shopping.png';
import saleIcon2 from '../../../assets/icons/promo-code.png';
import saleIcon3 from '../../../assets/icons/icons8-sale-price-tag-100.png';
import emailIcon from '../../../assets/icons/email.png';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../buttons/themeBtn.jsx';
import _, { property } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers';
import { validate } from 'email-validator';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext.jsx';
import dayjs from 'dayjs';
import { useAdminContext } from '../../../context/adminContext.jsx';
import { adminAxios } from '../../../api/axios.js';
import Step1 from './step1.jsx';
import Step2 from './step2.jsx';
import Step3 from './step3.jsx';
import Step4 from './step4.jsx';
import { useOfferContext } from '../../../context/offerContext.jsx';
import BoxWithProps from '../../common/BoxwithProps.jsx';

// delete soon
const { title, description } = {
    title: 'Create a promo code',
    description: `A promo code is an easy way to share a discount with anyone you choose. It can also be a great way to encourage purchases and build loyalty.`,
};
//

function Template({}) {
    const {
        errors,
        setErrors,
        details,
        setDetails,
        clearError,
        btnLoading,
        setBtnLoading,
        errorStyle,
        setModalOpen,

        handleContinue,

        modalView,
        setModalView,
    } = useOfferContext();

    const views = {
        1: <Step1 />,
        2: <Step2 />,
        3: <Step3 />,
    };

    const buttonText = {
        1: 'Continue',
        2: 'Review and confirm',
        3: 'Confirm and create code',
    };

    return (
        <Fragment>
            <BoxWithProps
                customSx={{
                    top: '5%',
                    left: '50%',

                    transform: 'translate(-50%, -0%)',
                    backgroundColor: 'white',
                    // padding: '2rem',
                    borderRadius: '1.8rem',
                    maxWidth: modalView == 4 ? '37.5rem' : '80vw',
                    // height: '100%',
                    // minHeight: '100vh',
                }}
            >
                {modalView == 4 ? (
                    <Step4 />
                ) : (
                    <section className=" h-full min-h-screen rounded-inherit bg-white ">
                        <header className="flex flex-nowrap items-center gap-8 rounded-t-inherit bg-blue-200 p-6">
                            <img
                                src={saleIcon2}
                                className="h-12 w-12 object-cover"
                            />

                            <h2 className="font-EBGaramond text-4xl">
                                {title}
                            </h2>
                        </header>
                        <body className="mt-10 flex h-full  min-h-screen  flex-col gap-6 bg-white px-28 ">
                            {views[modalView]}
                        </body>
                        <footer className="sticky bottom-0 z-[2] flex flex-nowrap justify-between bg-white px-6 py-5 shadow-normal">
                            <BubbleButton
                                handleClick={() => setModalOpen(() => false)}
                            />
                            <div className="flex flex-nowrap gap-4">
                                {modalView > 1 && (
                                    <ThemeBtn
                                        bg={'bg-white border-2 border-black'}
                                        handleClick={() =>
                                            setModalView(
                                                (prevState) => prevState - 1
                                            )
                                        }
                                    >
                                        {' '}
                                        <span className=" relative !z-[1] w-full cursor-pointer text-base font-medium text-black">
                                            Go back
                                        </span>
                                    </ThemeBtn>
                                )}

                                <ThemeBtn
                                    text={'Continue'}
                                    handleClick={handleContinue}
                                >
                                    {btnLoading ? (
                                        <div>
                                            {' '}
                                            <div className="spinner-circle ![--spinner-color:var(--gray-2)] ![--spinner-size:25px]"></div>
                                        </div>
                                    ) : (
                                        <span className=" relative !z-[1] w-full cursor-pointer text-base font-medium text-white">
                                            {buttonText[modalView] || ''}
                                        </span>
                                    )}
                                </ThemeBtn>
                            </div>
                        </footer>
                    </section>
                )}
            </BoxWithProps>
        </Fragment>
    );
}

export default Template;
