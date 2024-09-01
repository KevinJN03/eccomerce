import {
    CloseSharp,
    Inventory2Sharp,
    PrintSharp,
    RedeemSharp,
    UndoOutlined,
} from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import SeamlessDropdown from '../../../common/dropdown/seamlessDropdown';
import { useContent } from '../../../../context/ContentContext';

import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Actions({ setShowActions, showActions, children, orderId, order }) {
    const { setModalCheck, setModalContent, setShowAlert } = useContent();
    const { logoutUser } = UserLogout();
    const {
        setOrderInfo,
        setModalOpen,
        setTriggerFetchData,
        handleMarkGift,
        addToPackage,
    } = useAdminOrderContext();

    const navigate = useNavigate();
    const abortControllerRef = useRef(new AbortController());
    const printOrder = () => {
        setModalContent({
            type: 'printOrder',
            orders: [orderId],
        });
        setModalCheck(true);
        setShowActions(false);
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
                        handleClick: () =>
                            addToPackage({
                                orderId,
                                setShowActions,
                                mark_as_completed: false,
                            }),
                    },
                    {
                        text: _.get(order, 'mark_as_gift')
                            ? 'Unmark as gift'
                            : 'Mark as gift',
                        icon: (
                            <RedeemSharp
                                fontSize="small"
                                className="disable-drawer"
                            />
                        ),
                        handleClick: () =>
                            handleMarkGift({
                                orderId: [orderId],
                                setShowActions,
                            }),
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
                <button
                    onClick={() =>
                        navigate(`/admin/orders/${order?._id}/cancel_order`)
                    }
                    className={` flex w-full cursor-pointer flex-row flex-nowrap items-center gap-3 border-t py-2 pl-3 pr-6 text-start hover:bg-light-grey  `}
                >
                    <span>
                        <CloseSharp fontSize="small" />
                    </span>
                    <p className=" w-full whitespace-nowrap">Cancel</p>
                </button>
                <button
                    onClick={() =>
                        navigate(`/admin/orders/${order?._id}/refund_order`)
                    }
                    className={`flex w-full cursor-pointer flex-row flex-nowrap items-center gap-3 py-2 pl-3 pr-6 text-start hover:bg-light-grey  `}
                >
                    <span>
                        <UndoOutlined
                            className="!rotate-[-45deg]"
                            fontSize="small"
                        />
                    </span>
                    <p className=" w-full whitespace-nowrap">Refund</p>
                </button>
                {children}
            </section>
        </SeamlessDropdown>
    );
}
export default Actions;
