import { useEffect, useState } from 'react';

import OptionSelection from '../order/home/optionSelection';


import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DeliveryContextProvider from '../../../context/deliveryContext';

export default function Delivery() {

    const navigate = useNavigate();

    const [status, setStatus] = useState('Delivery Profiles');
    const location = useLocation();

    useEffect(() => {
        setStatus(() => location.pathname.split('/').pop());

        const set = new Set(['delivery-profiles', 'upgrades', 'postage']);

        const lastIndex = location.pathname.split('/').pop();

        if (set.has(lastIndex)) {
            setStatus(() => lastIndex);
        } else setStatus(() => 'delivery-profiles');
    }, [location.pathname]);

    return (
        <DeliveryContextProvider>
            <section className="flex flex-col gap-6 px-10 py-4 ">
                <h1 className="text-2xl font-semibold">Delivery settings</h1>

                <OptionSelection
                    {...{
                        status,
                        setStatus,
                        className: `${status == 'Delivery Profiles' ? 'sm+md:w-full lg:w-10/12' : 'w-full'}`,
                        options: [
                            {
                                text: 'Delivery Profiles',
                                select: 'delivery-profiles',
                                handleClick: () => {
                                    navigate(
                                        '/admin/delivery/delivery-profiles'
                                    );
                                },
                            },
                            {
                                text: 'Upgrades',
                                select: 'upgrades',
                                handleClick: () => {
                                    navigate('/admin/delivery/upgrades');
                                },
                            },
                            {
                                text: 'Postage label options',
                                select: 'postage',
                                handleClick: () => {
                                    navigate('/admin/delivery/postage');
                                },
                            },
                        ],
                    }}
                />

                <Outlet />
            </section>
        </DeliveryContextProvider>
    );
}
