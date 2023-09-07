import BasicModal from '../../../modal/modal';
import New_Product_Header from '../header';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useEffect, useState } from 'react';
import Input from '../input';
export default function Delivery() {
    const allProfiles = [
        {
            id: 1,
            name: 'Standard Delivery',
            shipping_time: '1-3 days',
            active_listings: '2',
            processing_time: '1-4days',
        },
        {
            id: 2,
            name: 'Standard Delivery',
            shipping_time: '1-3 days',
            active_listings: '2',
            processing_time: '1-4days',
        },
        {
            id: 3,
            name: 'Standard Delivery',
            shipping_time: '1-3 days',
            active_listings: '2',
            processing_time: '1-4days',
        },
    ];
    const ModalContent = (handleClose, handleOpen, open) => {
        const [content, setContent] = useState();
        useEffect(() => {
            setContent(mainContent());
        }, [open]);

        function Test({ profile }) {
            handleOpen();

            return (
                <>
                    <form>
                        <Input
                            label={'Name'}
                            id="name"
                            defaultValue={profile.name}
                        />

                        <button onClick={handleClose}>Save</button>
                    </form>
                </>
            );
        }
        function Popover({ icon, profile }) {
            return (
                <>
                    <div className="popover border-none">
                        <label className="popover-trigger" tabIndex="0">
                            {icon}
                        </label>
                        <div
                            className="popover-content popover-left-bottom bg-white"
                            tabIndex="0"
                        >
                            <div className="popover-arrow"></div>
                            <button
                                className="hover:bg-slate-100"
                                onClick={() =>
                                    setContent(<Test profile={profile} />)
                                }
                            >
                                Edit
                            </button>
                            {/* <button className="hover:bg-slate-100" onClick={handleClose}>Duplicate</button> */}
                        </div>
                    </div>
                </>
            );
        }

        function mainContent() {
            return (
                <div className="delivery-profile w-full">
                    <div className="modal-header flex items-center justify-between">
                        <h2 className="font-bold ">Delivery profiles</h2>
                        <button className="flex items-center justify-center gap-1 rounded-2xl border-2 px-2 py-1 font-medium">
                            {' '}
                            <span className="text-3xl">+</span> Create New
                        </button>
                    </div>
                    <div className="profiles mt-3">
                        {allProfiles.map((profile) => {
                            return (
                                <div
                                    key={profile.id}
                                    className="item border-1 mb-3 flex flex-row justify-between rounded-lg p-2"
                                >
                                    <div className="profile-info">
                                        <h2 className="mb-1 font-medium">
                                            {profile.name}
                                        </h2>
                                        <p className="mb-2">
                                            {profile.processing_time} Processing
                                            Time
                                        </p>
                                        <p>
                                            {profile.active_listings} Active
                                            Listing
                                        </p>
                                    </div>
                                    <section
                                        id="profile-btn"
                                        className="flex items-center justify-center"
                                    >
                                        <button>Apply</button>
                                        <Popover
                                            icon={<MoreHorizRoundedIcon />}
                                            profile={profile}
                                        />
                                    </section>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return <>{content}</>;
    };
    return (
        <section id="delivery">
            <New_Product_Header title={'Delivery'} />

            <div className="mt-3 flex items-center justify-between rounded-md border-2 p-4 font-semibold">
                <h3>
                    Delivery Option<span>*</span>
                </h3>
                <BasicModal
                    button_text="Select Profile"
                    ModalContent={ModalContent}
                />
            </div>
        </section>
    );
}
