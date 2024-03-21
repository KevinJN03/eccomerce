import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import SideBar from '../components/sidebar/sidebar';
import fetchProfile from '../components/product/new product/delivery/fetchDeliveryProfile';
import '../components/users/list.scss';
import Datatable from '../components/users/datatable/datatable';
import { deliveryColumn } from '../components/users/datatable/datatable-source';
import Modal from '../components/modal/modal';
import New from '../components/product/new product/delivery/New';
import { useAdminContext } from '../../../context/adminContext';
import actionColumn from '../components/users/datatable/actionColumn';
import OptionSelection from '../order/home/optionSelection';
import {
    AddRounded,
    ArrowDropDown,
    ContentCopySharp,
    DeleteRounded,
    EastRounded,
    EditRounded,
    ModeEditOutlineRounded,
    WestRounded,
} from '@mui/icons-material';
import DeliveryProfile from './deliveryProfile';
import Upgrades from './upgrades';
import Postage from './postage';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DeliveryContextProvider from '../../../context/deliveryCOntext';

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

    const value = {};
    return (
        <DeliveryContextProvider value={value}>
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
