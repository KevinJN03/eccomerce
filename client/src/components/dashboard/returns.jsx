import Header from './header';
import return_icon from '../../assets/icons/profile-icons/delivery-status.png';
import Empty_Body from './empty-body';

import duplicate_icon from '../../assets/icons/duplicate.png';
function Returns({}) {
    const options = [{ text: 'Order Issues FAQ' }, { text: 'Returns FAQ' }];
    return (
        <section className="returns">
            <Header icon={return_icon} text={'MY RETURNS'} />
            <Empty_Body
                text={{
                    small: 'You can create a return from My orders…',
                    big: 'YOU CURRENTLY HAVE NO RETURNS',
                    btn: 'VIEW MY ORDERS',
                }}
                link={'/my-account/orders'}
            />
            <section className="need-help mt-2 w-full bg-white px-4">
                <h3 className="border-b-[1px] py-4 text-lg font-bold">
                    NEED HELP?
                </h3>

                {options.map(({ text }, idx) => {
                    return (
                        <div
                            className={` flex flex-row items-center justify-between py-4 font-light decoration-2 underline-offset-1 transition-all hover:underline ${
                                options.length - 1 != idx && 'border-b-[1px]'
                            }`}
                            key={idx}
                        >
                            <p className="text-base">{text}</p>
                            <img src={duplicate_icon} className="h-8 w-8" />
                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default Returns;
