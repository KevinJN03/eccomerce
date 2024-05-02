import { Inventory2Sharp, PrintSharp, RedeemSharp } from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import SeamlessDropdown from '../../../common/dropdown/seamlessDropdown';
import { useContent } from '../../../../context/ContentContext';

import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
import _ from 'lodash';
import { useRef } from 'react';

function Actions({ setShowActions, showActions, children, orderId }) {
    const { setModalCheck, setModalContent, setShowAlert } = useContent();
    const { logoutUser } = UserLogout();
    const { setOrderInfo, setModalOpen, orderInfo } = useAdminOrderContext();
    const abortControllerRef = useRef(new AbortController());
    const printOrder = () => {
        setModalContent({
            type: 'printOrder',
            orders: [orderId],
        });
        setModalCheck(true);
        setShowActions(false);
    };

    const handleMarkGift = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.get(
                `/order/${orderId}/mark_as_gift`,
                { signal: abortControllerRef.current.signal }
            );

            setShowAlert(() => ({
                on: true,
                size: 'large',
                bg: 'bg-green-100',
                icon: 'check',
                msg: 'Gift status updated successfully',
                text: 'text-black',
            }));
        } catch (error) {
            logoutUser({ error });
            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    size: 'small',
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'Failed to get gift status. Please try again later.',
                }));
            }
        } finally {
            setShowActions(() => false);
        }
    };

    const addToPackage = async () => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.get(`order/${orderId}`, {
                signal: abortControllerRef.current.signal,
            });
            setOrderInfo(() => ({ ...data?.order }));
            setModalOpen(() => true);
            setShowActions(() => false);
        } catch (error) {
            logoutUser({ error });
            console.error(error);

            if (error.response.status != 401) {
                setShowAlert(() => ({
                    on: true,
                    size: 'small',
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: 'Failed to get order information. Please try again later.',
                }));
            }
        }

        setModalOpen(() => true);
        setShowActions(() => false);
    };
    return (
        <SeamlessDropdown {...{ setShow: setShowActions, show: showActions }}>
            <section className="mt-9">
                {[
                    {
                        text: 'Print',
                        icon: (
                            <PrintSharp
                                fontSize="small"
                                className="disable-drawer"
                            />
                        ),
                        handleClick: printOrder,
                    },
                    {
                        text: 'Add a package',
                        icon: (
                            <Inventory2Sharp
                                fontSize="small"
                                className="disable-drawer"
                            />
                        ),
                        handleClick: addToPackage,
                    },
                    {
                        text: 'Mark as gift',
                        icon: (
                            <RedeemSharp
                                fontSize="small"
                                className="disable-drawer"
                            />
                        ),
                        handleClick: handleMarkGift,
                    },
                ].map(({ text, icon, handleClick }, idx) => {
                    return (
                        <button
                            key={text}
                            onClick={handleClick}
                            className={` disable-drawer flex w-full cursor-pointer flex-row flex-nowrap items-center gap-3 py-2 pl-4 pr-6 text-start hover:bg-light-grey  ${
                                idx == 2 ? 'rounded-b-lg' : ''
                            }`}
                        >
                            <span className="disable-drawer">{icon}</span>
                            <p className="disable-drawer w-full whitespace-nowrap">
                                {' '}
                                {text}
                            </p>
                        </button>
                    );
                })}
                {children}
            </section>
        </SeamlessDropdown>
    );
}
export default Actions;
