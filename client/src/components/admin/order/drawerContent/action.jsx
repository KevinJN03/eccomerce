import { Inventory2Sharp, PrintSharp, RedeemSharp } from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import SeamlessDropdown from '../../../common/dropdown/seamlessDropdown';
import { useContent } from '../../../../context/ContentContext';

function Actions({ setShowActions, showActions, children, orderId }) {
    const { setModalCheck, setModalContent } = useContent();

    const { orderInfo } = useAdminOrderContext();
    const printOrder = () => {
        console.log('clicked');
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
        </SeamlessDropdown>
    );
}

export default Actions;
