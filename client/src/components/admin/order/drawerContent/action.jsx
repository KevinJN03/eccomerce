import { Inventory2Sharp, PrintSharp, RedeemSharp } from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import SeamlessDropdown from '../../../common/dropdown/seamlessDropdown';
import { useContent } from '../../../../context/ContentContext';
import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import AddToPackage from '../modalView/addToPackage/addToPackage';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';

function Actions({ setShowActions, showActions, children, orderId }) {
    const { setModalCheck, setModalContent, setShowAlert } = useContent();
    const { logoutUser } = UserLogout();
    const { setOrderInfo, setModalOpen } = useAdminOrderContext();
    const printOrder = () => {
        setModalContent({
            type: 'printOrder',
            orders: [orderId],
        });
        setModalCheck(true);
        setShowActions(false);
    };

    const addToPackage = async () => {
        try {
            const { data } = await adminAxios.get(`order/${orderId}`);
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
                    bg: 'bg-red-700',
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

            {/* <Modal open={modalOpen} onClose={() => setModalOpen(() => false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',

                        transform: 'translate(-50%, -0%)',
                        boxSizing: 'border-box',
                        maxWidth: '1200px',
                        width: '75vw',

                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'center',
                        // height: '100vh',

                        border: 'none',
                    }}
                >
                    <AddToPackage setModalOpen={setModalOpen} />
                </Box>
            </Modal> */}
        </SeamlessDropdown>
    );
}

export default Actions;
