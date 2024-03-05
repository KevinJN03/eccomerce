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
import { Outlet, useNavigate } from 'react-router-dom';

export default function Delivery() {
    const [profiles, setProfiles] = useState([]);
    const [deliveryProfile, setDeliveryProfile] = useState({});

    const { deliveryData } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    // const { dispatch, setModalCheck, content, modalCheck } = useContent();

    const navigate = useNavigate();
    const [selection, setSelection] = useState([]);
    const [modalCheck, setModalCheck] = useState(false);
    const addClick = () => {
        setType('new');
        setDeliveryProfile(null);
        setModalCheck(true);
    };

    const viewClick = (id) => {
        setType('view');
        console.log({ id });
        const findProfile = profiles.find((profile) => profile._id == id);
        setDeliveryProfile(findProfile);
        setModalCheck(true);
    };
    const deleteBtnCLick = () => {};

    const dataTableActionColumn = actionColumn({
        selection,
        deleteBtnCLick,
        viewBtn: true,
        viewClick: viewClick,
    });

    const [status, setStatus] = useState('Delivery Profiles');

    const exampleProfile = {
        name: '2-3 Weeks Delivery',
        processing_time: {
            start: 2,
            end: 3,
            type: 'weeks',
        },
        origin: 'KY15 7AA',
        active_listings: 1,
    };


    return (
        <section className="flex flex-col gap-6 px-6 py-4 ">
            <h1 className="text-2xl font-semibold">Delivery settings</h1>

            <OptionSelection
                {...{
                    status,
                    setStatus,
                    className: `${status == 'Delivery Profiles' ? 'sm+md:w-full lg:w-10/12' : 'w-full'}`,
                    options: [
                        {
                            text: 'Delivery Profiles',
                            handleClick: () => {
                                navigate('/admin/delivery/delivery-profiles');
                            },
                        },
                        {
                            text: 'Upgrades',
                            handleClick: () => {
                                navigate('/admin/delivery/upgrades');
                            },
                        },
                        {
                            text: 'Postage label options',
                            handleClick: () => {
                                navigate('/admin/delivery/postage');
                            },
                        },
                    ],
                }}
            />

      
            <Outlet />
        </section>
    );
}
