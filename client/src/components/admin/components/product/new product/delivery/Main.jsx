import New from './New';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Popover from './edit';
import { useContent } from '../../../../../../context/ContentContext';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import Edit from './edit';
import { adminAxios } from '../../../../../../api/axios';
import { useState, useEffect } from 'react';
import Delete from './delete';
import fetchProfile from './fetchDeliveryProfile';

function MainContent() {
    const {
        content,
        dispatch,
        setModalCheck,
        setProfile,
        profile,
        loading,
        setLoading,
    } = useContent();
    const [deliveryProfiles, setDeliveryProfiles] = useState([]);
    const [profileReplacement, setProfileReplacement] = useState(profile);
    useEffect(() => {
        fetchProfile(setDeliveryProfiles);
    }, []);

    useEffect(() => {
        fetchProfile(setDeliveryProfiles);
        let timeout;
        if (loading == true) {
            timeout = setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]);

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
            <span
                className="mb-2 flex items-center justify-center self-end rounded-full bg-slate-100 p-1 hover:bg-slate-300"
                onClick={() => setModalCheck(false)}
            >
                <CloseRoundedIcon />
            </span>
            <div className="modal-header flex items-center justify-between">
                <h2 className="font-gotham text-xl font-bold">
                    DELIVERY PROFILES
                </h2>
                <button
                    onClick={() => dispatch({ type: 'New' })}
                    className="flex items-center justify-center gap-1 rounded-2xl border-2 px-2 py-1 font-medium"
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
                                        className={`item border-1 mb-3 flex flex-row justify-between rounded-lg px-3 py-2 ${
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
                                            {findProfile && (
                                                <RemoveCircleOutlineRoundedIcon
                                                    onClick={() =>
                                                        removeProfile(
                                                            delivery._id
                                                        )
                                                    }
                                                />
                                            )}

                                            {!findProfile && <AddCircleOutlineRoundedIcon
                                                onClick={() =>
                                                    handleClick(delivery)
                                                }
                                            />}

                                            <Edit profile={delivery} />
                                            <Delete id={delivery._id} />
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
                            <>
                                <button
                                    type="button"
                                    onClick={confirm}
                                    className="bg-green-300 py-2 hover:bg-green-500"
                                >
                                    Confirm
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MainContent;
