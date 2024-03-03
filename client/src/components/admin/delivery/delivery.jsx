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
    ModeEditOutlineRounded,
} from '@mui/icons-material';

export default function Delivery() {
    const [profiles, setProfiles] = useState([]);
    const [deliveryProfile, setDeliveryProfile] = useState({});

    const { deliveryData } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    // const { dispatch, setModalCheck, content, modalCheck } = useContent();
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

    const [status, setStatus] = useState('');

    return (
        <section className="flex flex-col gap-6 px-6 py-4 sm+md:w-full lg:w-10/12">
            <h1 className="text-2xl font-semibold">Delivery settings</h1>

            <OptionSelection
                {...{
                    status,
                    setStatus,
                    options: [
                        {
                            text: 'Delivery Profiles',
                        },
                        {
                            text: 'Upgrades',
                        },
                        {
                            text: 'Postage label options',
                        },
                    ],
                }}
            />

            <div className="">
                <h3 className="text-lg font-semibold">
                    Your order processing schedule
                </h3>
                <p className="text-base">
                    Let us know the days of the week you prepare, package, or
                    dispatch orders. This can help improve the accuracy of
                    buyers' delivery dates and your dispatch-by dates.
                </p>
            </div>

            <div className="rounded-lg border border-dark-gray px-8 py-8">
                <p className="text-base font-semibold">Monday-Friday</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold">Delivery profiles</h2>
                <p className="text-base">
                    Delivery profiles can be used for multiple listings with
                    similar postage costs. This helps save time if you want to
                    add new items to your shop or update multiple listings at
                    once.
                </p>
            </div>

            <section className="w-full">
                <div className="flex w-full flex-row ">
                    <div className="flex flex-row flex-nowrap items-center">
                        <input
                            type="checkbox"
                            className="daisy-checkbox daisy-checkbox-sm rounded-sm border-dark-gray"
                        />
                        <div className="p-4">
                            <ArrowDropDown />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="flex flex-row items-center gap-2 rounded-full border-2 border-black p-3"
                    >
                        <ModeEditOutlineRounded />

                        <p className="whitespace-nowrap text-sm ">
                            Edit origin post code
                        </p>
                        <ArrowDropDown />
                    </button>
                    <div className="flex w-full justify-end">
                        <button
                            type="button"
                            className="flex flex-nowrap items-center gap-3 self-center  rounded-full border-2 border-black p-3"
                        >
                            <AddRounded />
                            <p className="whitespace-nowrap">Create profile</p>
                        </button>
                    </div>
                </div>

                <table className="mt-5 w-full">
                    <colgroup>
                        <col span="1" width={'5%'} className='bg-red-500' />
                        <col span="1" width={'30%'} className='bg-yellow-500'/>
                        <col span="1" width={'15%'} className='bg-orange-500' />
                        <col span="1" width={'20%'} className='bg-pink-500'/>
                        <col span="1" width={'20%'} className='bg-purple-500' />
                        <col span="1" width={'30%'} className='bg-blue-500'/>
                    </colgroup>
                    <tr className="">
                        <th  />
                        <th  />
                        <th className="whitespace-nowrap text-xs font-medium underline">
                            Processing Time
                        </th>
                        <th className="text-xs font-medium">Origin</th>

                        <th className="text-xs font-medium">Active Listings</th>
                        <th />
                    </tr>
                </table>
            </section>
        </section>
        // <>
        //     <Datatable
        //         type="delivery"
        //         column={deliveryColumn}
        //         row={deliveryData}
        //         setLoading={setLoading}
        //         loading={loading}
        //         addBtn={addClick}

        //         actionColumn={dataTableActionColumn}
        //     />
        //     {modalCheck && (
        //         <Modal
        //             ModalContent={
        //                 <New
        //                     profile={deliveryProfile}
        //                     setProfile={setDeliveryProfile}
        //                     setModalState={setModalCheck}
        //                 />
        //             }
        //             button_text="Select Profile"
        //             check={modalCheck}
        //             setCheck={setModalCheck}
        //             loading={loading}
        //             setLoading={setLoading}
        //         />
        //     )}
        // </>
    );
}
