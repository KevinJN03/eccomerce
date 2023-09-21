import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import SideBar from '../components/sidebar/sidebar';
import { adminAxios } from '../../../api/axios';
import fetchProfile from '../components/product/new product/delivery/fetchDeliveryProfile';
import '../components/users/list.scss';
import Datatable from '../components/users/datatable/datatable';
import { deliveryColumn } from '../components/users/datatable/datatable-source';
export default function Delivery() {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchProfile(setProfile);
    }, []);
    useEffect(() => {
        fetchProfile(setProfile);
    }, [loading]);
    return (
        <section className="delivery flex">
            <SideBar />
            <section className="delivery-container w-full flex-[6]">
                <Navbar />
                <Datatable
                    type="delivery"
                    column={deliveryColumn}
                    row={profile}
                    setLoading={setLoading}
                    loading={loading}
                />
            </section>
        </section>
    );
}
