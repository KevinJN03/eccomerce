import New from './New';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Popover from './edit';
import { useContent } from '../../../../../../context/ContentContext';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Edit from './edit';
const allProfiles = [
    {
        id: 1,
        name: 'Free Delivery',
        shipping_time: '1-3 days',
        active_listings: '2',
        processing_time: '1-4days',
        price: 0.00
    },
    {
        id: 2,
        name: 'Standard Delivery',
        shipping_time: '1-3 days',
        active_listings: '2',
        processing_time: '1-4days',
        price: 3.99
    },
    {
        id: 3,
        name: 'Expedited Delivery',
        shipping_time: '1-3 days',
        active_listings: '2',
        processing_time: '1-4days',
        price: 5.99
    },
];

function MainContent() {
    const { content, dispatch, setModalCheck, setProfile } = useContent();


    const handleClick = (profile) => {

        setModalCheck(false)
        setProfile(profile)

    }
    return (
        <div className="delivery-profile flex w-full flex-col">
            <span
                className="mb-2 flex items-center justify-center self-end rounded-full bg-slate-100 p-1 hover:bg-slate-300"
                onClick={() => setModalCheck(false)}
            >
                <CloseRoundedIcon />
            </span>
            <div className="modal-header flex items-center justify-between">
                <h2 className="font-bold font-gotham text-xl">DELIVERY PROFILES</h2>
                <button
                    onClick={() => dispatch({ type: 'New' })}
                    className="flex items-center justify-center gap-1 rounded-2xl border-2 px-2 py-1 font-medium"
                >
                    <span className="text-3xl">+</span> Create New
                </button>
            </div>
            <div className="profiles mt-3">
                {allProfiles.map((profile) => {
                    return (
                        <div
                            key={profile.id}
                            className="item border-1 mb-3 flex flex-row justify-between rounded-lg px-3 py-2"
                        >
                            <div className="profile-info">
                                <h2 className="mb-1 font-medium">
                                    {profile.name}
                                </h2>
                                <p className="mb-2">
                                    {profile.processing_time} Processing Time
                                </p>
                                <p>{profile.active_listings} Active Listing</p>
                            </div>
                            <section
                                id="profile-btn"
                                className="flex items-center justify-center"
                            >
                                <button className='mr-4' onClick={() => handleClick(profile)}><AddCircleOutlineRoundedIcon/></button>
                                <Edit profile={profile} />
                            </section>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainContent;
