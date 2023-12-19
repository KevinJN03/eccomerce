import { useEffect, useState } from 'react';
import Input from '../../Login-SignUp/input';
import ReactCountryFlag from 'react-country-flag';
import ReactFlagsSelect from 'react-flags-select';
import Address_Form from './form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserDashboardContext } from '../../../context/userContext';
import sorry_logo from '../../../assets/icons/sorry.png';

import notFound_logo from '../../../assets/icons/not-found.png';
import axios from '../../../api/axios';
import { useAuth } from '../../../hooks/useAuth';
function Edit_Address({}) {
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams();
    const [findAddress, setFindAddress] = useState({});
    const { address, setAddress, setFooterMessage } = useUserDashboardContext();
    const [loadState, setLoadState] = useState(true);

    const { authDispatch } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (address.length > 0) {
            const findAddressItem = address.find((item) => item._id == id);

            if (findAddressItem) {
                findAddressItem.address = {
                    country: findAddressItem?.country,
                    address_1: findAddressItem?.address_1,
                    city: findAddressItem?.city,
                    postCode: findAddressItem?.postCode,
                    county: findAddressItem?.county,
                };

                setFindAddress(() => findAddressItem);
                setTimeout(() => {
                    setLoadState(() => false);
                }, 1200);
            } else {
                setTimeout(() => {
                    setNotFound(() => true);
                    setLoadState(() => false);
                }, 1200);
            }
        }
    }, [address]);

    const handleClick = async ({
        firstName,
        lastName,
        mobile,
        address,
        setError,
        setDisable,
        setLoading,
    }) => {
        let success = false;
        const errorData = {};
        try {
            setLoading(() => true);
            const result = await axios.put(`user/address/edit/${id}`, {
                firstName,
                lastName,
                mobile,
                ...address,
            });

            setAddress(() => result.data.user.address);
            success = true
        } catch (error) {
            if (error.response.status == 404) {
                setNotFound(() => true);
            }
            logOutUser({ error, authDispatch, navigate });

            Object.assign(errorData, error.response.data);
          
        } finally {
            setTimeout(() => {
                setLoading(false);
                if (!success) {
                    setError(() => errorData);
                    setDisable(true);
                } else {
                    navigate('/my-account/addresses');

                    setFooterMessage({ success, text: 'Changes saved' });
                }
            }, 1200);
        }
    };

    return (
        <section className="edit_address">
            {loadState ? (
                <div className="flex h-[400px] w-full items-center justify-center">
                    <div className="spinner-circle [--spinner-color:var(--gray-9)]"></div>
                </div>
            ) : notFound ? (
                <div className="flex h-[400px] min-h-full w-full flex-col items-center justify-center bg-white p-4">
                    <img
                        src={notFound_logo}
                        alt="crying yellow emojji with cloud background"
                    />
                    <p className="mt-4 w-4/6 text-center text-base font-[400]">
                        Sorry we couldn't find this address. It may have been
                        deleted already or never existed.
                    </p>
                </div>
            ) : (
                <Address_Form
                    customer={findAddress}
                    handleClick={handleClick}
                    title={'EDIT ADDRESS'}
                    description={` Update your address details and all future delivery labels will
                appear exactly as they are below.`}
                />
            )}
        </section>
    );
}

export default Edit_Address;
