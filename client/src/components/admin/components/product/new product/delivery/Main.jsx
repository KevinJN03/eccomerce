import { useState, useEffect, useRef } from 'react';
import Delete from './delete';
import fetchProfile from './fetchDeliveryProfile';
import { useNewProduct } from '../../../../../../context/newProductContext';
import {
    AddCircleOutlineRounded,
    DeleteForeverSharp,
    ModeEditOutlineOutlined,
    RemoveCircleOutlineRounded,
} from '@mui/icons-material';
import { adminAxios } from '../../../../../../api/axios';
import UserLogout from '../../../../../../hooks/userLogout';
import BubbleButton from '../../../../../buttons/bubbleButton';

function MainContent() {
    const {
        setProfile,
        profile,
        setModalCheck,

        contentDispatch,
    } = useNewProduct();
    const [deliveryProfiles, setDeliveryProfiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const { logOutUser } = UserLogout();
    const [profileReplacement, setProfileReplacement] = useState(
        JSON.parse(JSON.stringify(profile))
    );
    const [disable, setDisable] = useState(true);

    const abortControllerRef = useRef(new AbortController());
    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const fetchData = async () => {
            try {
                const { data } = await adminAxios.get('/delivery/all', {
                    signal: abortControllerRef.current?.signal,
                });

                setDeliveryProfiles(() => data);
            } catch (error) {
                console.error('error while fetching: ', error.message);

                logOutUser({ error });
            } finally {
                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);
            }
        };

        fetchData();
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        if (JSON.stringify(profile) != JSON.stringify(profileReplacement)) {
            setDisable(false);
        }
    }, [profileReplacement]);

    // useEffect(() => {
    //     fetchProfile(setDeliveryProfiles);
    //     let timeout;
    //     if (loading == true) {
    //         timeout = setTimeout(() => {
    //             setLoading(false);
    //         }, 1000);
    //     }
    // }, [loading]);

    const handleClick = (profile) => {
        setProfileReplacement((prevState) => [...prevState, profile]);
    };

    const confirm = () => {
        setModalCheck(false);
        setProfile(profileReplacement);
    };

    const removeProfile = (id) => {
        let newArr = [...profileReplacement];
        const newProfile = newArr.filter((item) => item._id != id);
        setProfileReplacement(newProfile);
    };
    return (
        <div className="delivery-profile flex w-full flex-col">
            <div className="modal-header flex items-center justify-between">
                <h2 className="font-gotham text-xl font-bold">
                    DELIVERY PROFILES
                </h2>
                <button
                    onClick={() => contentDispatch({ type: 'delivery_new' })}
                    className="flex items-center justify-center gap-1 rounded-2xl border-2 px-2 py-1 font-medium transition-all hover:!px-6"
                >
                    <span className="text-3xl">+</span> Create New
                </button>
            </div>
            <div className="profiles mt-3 flex flex-col">
                {loading ? (
                    <div class="spinner-circle self-center [--spinner-color:var(--gray-9)]"></div>
                ) : (
                    <>
                        {deliveryProfiles &&
                            deliveryProfiles.map((delivery) => {
                                const { start, end, type } =
                                    delivery.processingTime;

                                const findProfile = profileReplacement.find(
                                    (item) => item._id == delivery._id
                                );
                                return (
                                    <div
                                        key={delivery._id}
                                        className={`item border-1 mb-3 flex flex-row justify-between rounded-lg px-3 py-2 hover:bg-light-grey/60 ${
                                            findProfile && 'border-green-400'
                                        }`}
                                    >
                                        <div className="profile-info">
                                            <h2 className="mb-1 font-medium">
                                                {delivery.name}
                                            </h2>
                                            <p className="mb-1">
                                                {`${start} - ${end} ${type}`}{' '}
                                                Processing Time
                                            </p>

                                            <p className="mb-1">
                                                {delivery.cost > 0 ? (
                                                    <span>
                                                        £ {delivery.cost}{' '}
                                                    </span>
                                                ) : (
                                                    'FREE'
                                                )}
                                            </p>
                                            <p>
                                                {delivery.active_listings}{' '}
                                                Active Listing
                                            </p>
                                        </div>
                                        <section
                                            id="profile-btn"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            {findProfile ? (
                                                <RemoveCircleOutlineRounded
                                                    className="box-content rounded-full p-1 hover:bg-dark-gray/80"
                                                    onClick={() =>
                                                        removeProfile(
                                                            delivery._id
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <AddCircleOutlineRounded
                                                    className="box-content rounded-full p-1 hover:bg-dark-gray/80"
                                                    onClick={() =>
                                                        handleClick(delivery)
                                                    }
                                                />
                                            )}

                                            <button
                                                className="box-content rounded-full p-1 hover:bg-dark-gray/80"
                                                onClick={() => {
                                                    contentDispatch({
                                                        type: 'delivery_edit',
                                                        profile: delivery,
                                                    });
                                                }}
                                            >
                                                <ModeEditOutlineOutlined />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    contentDispatch({
                                                        type: 'delivery_delete',
                                                        deliveryProfileId:
                                                            delivery._id,
                                                    });
                                                }}
                                                className="box-content rounded-full p-1 hover:bg-dark-gray/80"
                                            >
                                                <DeleteForeverSharp />
                                            </button>
                                        </section>
                                    </div>
                                );
                            })}

                        {deliveryProfiles.length < 1 && (
                            <p className="my-3 w-full text-center">
                                There are no delivery profiles, Please create a
                                Profile
                            </p>
                        )}

                        {deliveryProfiles.length > 0 && (
                            <div className="mt-5 flex w-full flex-row items-center justify-between gap-x-2">
                                <BubbleButton
                                    handleClick={() => setModalCheck(false)}
                                />
                                <button
                                    type="button"
                                    onClick={confirm}
                                    className=" theme-btn  disabled:bg-black-50 rounded-full bg-black px-5 py-3 text-base font-medium text-white disabled:cursor-not-allowed"
                                    // disabled={disable}
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MainContent;
