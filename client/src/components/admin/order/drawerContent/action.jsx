import { Inventory2Sharp, PrintSharp, RedeemSharp } from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrder';

function Actions({ setShowActions, orderId }) {
    const { adminOrderModalContentDispatch, setModalCheck } =
        useAdminOrderContext();
    const printOrder = () => {
        console.log('clicked');
        adminOrderModalContentDispatch({
            type: 'printOrder',
            orders: [orderId],
        });
        setModalCheck(true);
        setShowActions(false);
    };

    return (
        <section className="">
            {[
                {
                    text: 'Print',
                    icon: <PrintSharp fontSize="small" className='disable-drawer' />,
                    handleClick: printOrder,
                },
                {
                    text: 'Add a package',
                    icon: <Inventory2Sharp fontSize="small" className='disable-drawer' />,
                },
                {
                    text: 'Mark as gift',
                    icon: <RedeemSharp fontSize="small" className='disable-drawer' />,
                },
            ].map(({ text, icon, handleClick }, idx) => {
                return (
                    <button
                        key={text}
                        onClick={handleClick}
                        className={` disable-drawer w-full text-start flex cursor-pointer flex-row flex-nowrap items-center gap-3 py-2 pl-3 pr-6 hover:bg-light-grey  ${
                            idx == 2 ? 'rounded-b-lg' : ''
                        }`}
                    >
                        <span className='disable-drawer'>{icon}</span>
                        <p className="disable-drawer whitespace-nowrap w-full"> {text}</p>
                    </button>
                );
            })}
        </section>
    );
}

export default Actions;
