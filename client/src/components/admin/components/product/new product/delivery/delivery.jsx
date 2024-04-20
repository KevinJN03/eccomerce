import Modal from '../../../modal/modal';
import New_Product_Header from '../header';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import New from './New';
import { forwardRef, useEffect, useState } from 'react';

import MainContent from './Main';

const views = {
    Main: <MainContent />,
    New: <New />,
    Edit: <New />,
};

import { useNewProduct } from '../../../../../../context/newProductContext';
import OptionError from '../variation/error/optionError';
import { useContent } from '../../../../../../context/ContentContext';
import _ from 'lodash';
import BubbleButton from '../../../../../buttons/bubbleButton';
import { ModeEditOutlineRounded } from '@mui/icons-material';
import ThemeBtn from '../../../../../buttons/themeBtn.jsx';
function Delivery() {
    const {
        profile,
        publishErrorDispatch,
        publishError,
        contentDispatch,
        setProfile,
    } = useNewProduct();

    const { setModalCheck, setModalContent } = useContent();
    const [triggerRefresh, setTriggerRefresh] = useState(false);

    const handleClick = () => {
        publishErrorDispatch({ type: 'CLEAR', path: 'delivery' });
    };
    return (
        <section className="new-product-wrapper">
            <section id="delivery" className="">
                <New_Product_Header
                    title={'Delivery'}
                    text={`Give shoppers clear expectations about delivery time and cost by making sure your delivery info is accurate, including the delivery profile and your order processing time. You can make updates any time in Delivery settings.

`}
                />

                {!_.isEmpty(profile) ? (
                    <div className="mt-10 flex flex-col gap-2  font-semibold">
                        <h3>
                            Delivery Option
                            <span className="pl-0.5 text-lg text-red-700">
                                *
                            </span>
                        </h3>
                        <div className="flex w-full flex-row justify-between rounded-xl border border-dark-gray p-6">
                            <div className="left ">
                                {' '}
                                <p className="text-base">{profile?.name}</p>
                                <p className="mt-1 text-xs font-normal text-black/70">
                                    {`${_.get(profile, ['processing_time', 'start']) == _.get(profile, ['processing_time', 'end']) ? _.get(profile, ['processing_time', 'start']) : `${_.get(profile, ['processing_time', 'start'])}-${_.get(profile, ['processing_time', 'end'])} ${_.get(profile, ['processing_time', 'type'])}`} processing time, from ${_.get(profile, 'origin_post_code')}`}
                                </p>
                                {_.get(profile, 'active_listings') > 0 && (
                                    <p className="text-xs font-normal text-black/70">
                                        {`${profile?.active_listings} active ${profile?.active_listings > 1 ? 'listings' : 'listing'}`}
                                    </p>
                                )}
                            </div>
                            <div className="right flex items-center gap-2">
                                <BubbleButton
                                    handleClick={() => {
                                        setModalContent(() => ({
                                            type: 'deliveryOption',
                                            profileId: profile?._id,
                                            setProfile,
                                            setTriggerRefresh,
                                            handleClick,
                                        }));

                                        setModalCheck(() => true);
                                    }}
                                >
                                    <p className="text-base font-semibold">
                                        Change
                                    </p>
                                </BubbleButton>
                                <ThemeBtn
                                    bg={'bg-light-grey'}
                                    handleClick={() => {
                                        setModalContent(() => ({
                                            type: 'createProfile',
                                            version: 'edit',
                                            profileId: profile?._id,
                                            handleClick,
                                            setTriggerRefresh,
                                        }));

                                        setModalCheck(() => true);
                                    }}
                                >
                                    <div className="flex flex-nowrap gap-2">
                                        <ModeEditOutlineRounded className="" />
                                        <p className="text-base font-semibold">
                                            Edit
                                        </p>
                                    </div>
                                </ThemeBtn>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className=" mt-10 flex w-full flex-row items-center justify-between rounded-xl border border-dark-gray p-6">
                        <h3 className="font-semibold">
                            Delivery Option
                            <span className="pl-0.5 text-lg text-red-700">
                                *
                            </span>
                        </h3>

                        <ThemeBtn
                            bg={'bg-transparent border-2 border-black'}
                            handleClick={() => {
                                setModalContent(() => ({
                                    type: 'deliveryOption',
                                    setProfile,
                                    setTriggerRefresh,
                                    handleClick,
                                }));
                                setModalCheck(() => true);
                            }}
                        >
                            <p className="text-base font-medium text-black ">
                                Select profile
                            </p>
                        </ThemeBtn>
                    </div>
                )}

                {publishError?.delivery && (
                    <OptionError
                        className={'m-0 px-0 pb-0'}
                        msg={publishError.delivery}
                    />
                )}
            </section>
        </section>
    );
}
export default Delivery;
