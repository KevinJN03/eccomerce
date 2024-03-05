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
import BubbleButton from '../../buttons/bubbleButton.jsx';
import { useContent } from '../../../context/ContentContext.jsx';
function DeliveryProfile({ status, setStatus }) {
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

    const { setModalCheck, setModalContent } = useContent();
    return (
        <section className=" flex flex-col gap-6 sm+md:w-full lg:w-10/12">
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

            <div className="flex flex-row flex-nowrap items-center justify-between rounded-lg border border-dark-gray px-8 py-6">
                <p className="text-base font-semibold">Monday-Friday</p>
                <BubbleButton
                    handleClick={() => {
                        setModalCheck(() => true);
                        setModalContent(()=> ({type: 'processOrder'}))
                    }}
                >
                    <div className="flex flex-row flex-nowrap items-center gap-2  ">
                        <ModeEditOutlineRounded className="!z-[3]" />

                        <p className="!z-[3] text-base font-semibold">Edit</p>
                    </div>
                    {/* <span className=" relative !z-[3] w-full text-base font-medium">
                        Cancel
                    </span> */}
                </BubbleButton>
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
                <div className="flex w-full flex-row pl-4">
                    <div className="flex flex-row flex-nowrap items-center">
                        <input
                            type="checkbox"
                            className="daisy-checkbox h-[1.125rem] w-[1.125rem] rounded-sm border-dark-gray"
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
                        <col span="1" width={'5%'} className="bg-red-500/0" />
                        <col
                            span="1"
                            width={'40%'}
                            className="bg-yellow-500/0"
                        />
                        <col
                            span="1"
                            width={'25%'}
                            className="bg-orange-500/0"
                        />
                        <col
                            span="1"
                            width={'7.5%'}
                            className="bg-pink-500/0"
                        />
                        <col
                            span="1"
                            width={'7.5%'}
                            className="bg-purple-500/0"
                        />
                        <col span="1" width={'15%'} className="bg-blue-500/0" />
                    </colgroup>
                    <tr
                        className="
                    "
                    >
                        <th className=" pb-2" />
                        <th className=" pb-2" />
                        <th className="whitespace-nowrap pb-2 text-left text-xs font-medium underline">
                            Processing Time
                        </th>
                        <th className="pb-2 text-left text-xs font-medium">
                            Origin
                        </th>

                        <th className="pb-2 text-left text-xs font-medium">
                            Active Listings
                        </th>
                        <th className="pb-2" />
                    </tr>

                    {[exampleProfile, exampleProfile, exampleProfile].map(
                        ({
                            name,
                            processing_time,
                            origin,
                            active_listings,
                        }) => {
                            return (
                                <tr className="border-b-2 border-light-grey hover:bg-light-grey">
                                    <td className="py-6 pl-4">
                                        <input
                                            type="checkbox"
                                            className="daisy-checkbox h-[1.125rem] w-[1.125rem] rounded-sm border-dark-gray"
                                        />
                                    </td>
                                    <td className="py-6 pl-5">
                                        <p className="text-base font-semibold">
                                            {name}
                                        </p>
                                    </td>

                                    <td className="py-6">
                                        <p className="text-base ">
                                            {`${processing_time.start}-${processing_time.end} ${processing_time.type}`}
                                        </p>
                                    </td>

                                    <td className="py-6">
                                        <p className="w-2/4 text-base">
                                            {origin}
                                        </p>
                                    </td>

                                    <td className="py-6">
                                        <p className="text-base">
                                            {active_listings}
                                        </p>
                                    </td>

                                    <td className="py-6 pr-3">
                                        <div className="flex w-full flex-nowrap items-center justify-end">
                                            <button
                                                type="button"
                                                className="rounded-full p-2 transition-all hover:bg-dark-gray/30"
                                            >
                                                <EditRounded />
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-full p-2 transition-all hover:bg-dark-gray/30"
                                            >
                                                <ContentCopySharp />
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-full p-2 transition-all hover:bg-dark-gray/30"
                                            >
                                                <DeleteRounded />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </table>

                <div className="delivery-pagination mt-4 flex flex-row flex-nowrap justify-end gap-1.5">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-light-grey">
                        <WestRounded fontSize="small" />
                    </button>

                    {[1, 2, 3, 4].map((item) => {
                        return (
                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-light-grey"
                            >
                                <p className="text-sm font-medium">{item}</p>
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-light-grey"
                    >
                        <EastRounded fontSize="small" />
                    </button>
                </div>
            </section>
        </section>
    );
}

export default DeliveryProfile;
