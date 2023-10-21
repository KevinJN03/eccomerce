import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import SideBar from '../components/sidebar/sidebar';
import fetchProfile from '../components/product/new product/delivery/fetchDeliveryProfile';
import '../components/users/list.scss';
import Datatable from '../components/users/datatable/datatable';
import { deliveryColumn } from '../components/users/datatable/datatable-source';
import Modal from '../components/modal/modal';
import New from '../components/product/new product/delivery/New';

export default function Delivery() {
    const [profiles, setProfiles] = useState([]);
    const [deliveryProfile, setDeliveryProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    // const { dispatch, setModalCheck, content, modalCheck } = useContent();

    const [modalCheck, setModalCheck] = useState(false);
    useEffect(() => {
        fetchProfile(setProfiles);
    }, []);
    useEffect(() => {
        fetchProfile(setProfiles);
    }, [loading]);

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
    const close = () => {
        setModalCheck(false);
    };

    return (
        <section className="delivery flex">
            <SideBar />
            <section className="delivery-container w-full flex-[6]">
                <Navbar />
                <Datatable
                    type="delivery"
                    column={deliveryColumn}
                    row={profiles}
                    setLoading={setLoading}
                    loading={loading}
                    addBtn={addClick}
                    viewBtn={viewClick}
                />
                {modalCheck && (
                    <Modal
                        ModalContent={
                            <New
                                close={close}
                                profile={deliveryProfile}
                                setProfile={setDeliveryProfile}
                                setLoadingState={setLoading}
                                loadingState={loading}
                            />
                        }
                        button_text="Select Profile"
                        check={modalCheck}
                        setCheck={setModalCheck}
                        loading={loading}
                        setLoading={setLoading}
                
                    />
                )}
            </section>
        </section>
    );
}
