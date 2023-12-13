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

export default function Delivery() {
    const [profiles, setProfiles] = useState([]);
    const [deliveryProfile, setDeliveryProfile] = useState({});

    const { deliveryData } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    // const { dispatch, setModalCheck, content, modalCheck } = useContent();

    const [modalCheck, setModalCheck] = useState(false);
    const addClick = () => {
        setType('new');
        setDeliveryProfile(null);
        setModalCheck(true);
    };

    const viewClick = (id) => {
        setType('view');
        ({ id });
        const findProfile = profiles.find((profile) => profile._id == id);
        setDeliveryProfile(findProfile);
        setModalCheck(true);
    };

    return (
        <>
            <Datatable
                type="delivery"
                column={deliveryColumn}
                row={deliveryData}
                setLoading={setLoading}
                loading={loading}
                addBtn={addClick}
                viewBtn={viewClick}
            />
            {modalCheck && (
                <Modal
                    ModalContent={
                        <New
                            profile={deliveryProfile}
                            setProfile={setDeliveryProfile}
                            setModalState={setModalCheck}
                        />
                    }
                    button_text="Select Profile"
                    check={modalCheck}
                    setCheck={setModalCheck}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
        </>
    );
}
