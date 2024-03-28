import {
    ContentCopySharp,
    EditRounded,
    DeleteRounded,
} from '@mui/icons-material';
import { useContent } from '../../../context/ContentContext';
import { Tooltip } from '@mui/material';
function Table({
    profiles,
    refreshLoading,
    selection,
    page,
    currentPageProfiles,
    setTriggerRefresh,
    setSelection,
}) {
    const { setModalCheck, setModalContent, modalContent } = useContent();

    return (
        <table className="mt-5 w-full">
            <colgroup>
                <col span="1" width={'5%'} className="bg-red-500/0" />
                <col span="1" width={'40%'} className="bg-yellow-500/0" />
                <col span="1" width={'25%'} className="bg-orange-500/0" />
                <col span="1" width={'7.5%'} className="bg-pink-500/0" />
                <col span="1" width={'7.5%'} className="bg-purple-500/0" />
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
                <th className="pb-2 text-left text-xs font-medium">Origin</th>

                <th className="pb-2 text-left text-xs font-medium">
                    Active Listings
                </th>
                <th className="pb-2" />
            </tr>

            {currentPageProfiles.map(
                ({
                    _id,
                    name,
                    processing_time,
                    origin_post_code,
                    active_listings,
                }) => {
                    return (
                        <tr
                            key={_id}
                            className={`border-dark-grey border-b-2 hover:bg-light-grey  ${selection.has(_id) ? 'bg-light-grey/60' : ''}`}
                        >
                            <td className=" relative py-6 pl-4">
                                {refreshLoading &&
                                (modalContent?.profileId == _id ||
                                    selection.has(_id)) ? (
                                    <div class="skeleton-static absolute left-1/2 top-1/2 h-9 w-9 translate-x-[-50%] translate-y-[-50%]  rounded-full" />
                                ) : (
                                    <input
                                        onChange={() => {
                                            console.log('clicked here');
                                            setSelection((prevSelection) => {
                                                const newSelection = new Set(
                                                    prevSelection
                                                );

                                                if (newSelection.has(_id)) {
                                                    newSelection.delete(_id);
                                                } else {
                                                    newSelection.add(_id);
                                                }

                                                return newSelection;
                                            });
                                        }}
                                        type="checkbox"
                                        checked={selection.has(_id)}
                                        className={`daisy-checkbox h-[1.125rem] w-[1.125rem] rounded-sm border-dark-gray `}
                                    />
                                )}
                            </td>
                            <td className="px-5 py-6  ">
                                <div className="flex items-center">
                                    {refreshLoading &&
                                    (modalContent?.profileId == _id ||
                                        selection.has(_id)) ? (
                                        <div class="skeleton-static h-9 w-full rounded !pr-5 " />
                                    ) : (
                                        <p
                                            className={`align-middle text-base font-semibold  `}
                                        >
                                            {name}
                                        </p>
                                    )}
                                </div>
                            </td>

                            <td className="py-6 pr-5">
                                {refreshLoading &&
                                (modalContent?.profileId == _id ||
                                    selection.has(_id)) ? (
                                    <div class="skeleton-static  h-9 w-full rounded" />
                                ) : (
                                    <p className={`text-base `}>
                                        {`${processing_time.start}-${processing_time.end} ${processing_time.type}`}
                                    </p>
                                )}
                            </td>

                            <td className="py-6 pr-5">
                                {refreshLoading &&
                                (modalContent?.profileId == _id ||
                                    selection.has(_id)) ? (
                                    <div class="skeleton-static h-12 w-full rounded" />
                                ) : (
                                    <p
                                        className={`w-full max-w-10 text-wrap break-words text-base `}
                                    >
                                        {origin_post_code?.toUpperCase()}
                                    </p>
                                )}
                            </td>

                            <td className="py-6 pr-5">
                                {refreshLoading &&
                                (modalContent?.profileId == _id ||
                                    selection.has(_id)) ? (
                                    <div class="skeleton-static h-9 w-full rounded" />
                                ) : (
                                    <p className={`text-base `}>
                                        {active_listings}
                                    </p>
                                )}
                            </td>

                            <td className="py-6 pr-3">
                                <div
                                    className={`flex w-full flex-nowrap items-center justify-end ${refreshLoading && (modalContent?.profileId == _id || selection.has(_id)) ? 'gap-2' : 'gap-0'}`}
                                >
                                    {[
                                        {
                                            icon: <EditRounded />,
                                            title: 'Edit',
                                            props: {
                                                type: 'createProfile',
                                                version: 'edit',
                                            },
                                        },
                                        {
                                            title: 'Duplicate',
                                            icon: <ContentCopySharp />,

                                            props: {
                                                type: 'createProfile',
                                                version: 'duplicate',
                                            },
                                        },
                                        {
                                            icon: <DeleteRounded />,
                                            title: 'Delete',
                                            props: {
                                                type: 'deleteProfile',
                                            },
                                        },
                                    ].map(({ icon, title, props }) => {
                                        return (
                                            <>
                                                {refreshLoading &&
                                                modalContent?.profileId ==
                                                    _id ? (
                                                    <div class="skeleton-static !h-9 !w-9 rounded-full" />
                                                ) : (
                                                    <Tooltip
                                                        arrow
                                                        title={title}
                                                        slotProps={{
                                                            arrow: {
                                                                sx: {
                                                                    fontSize:
                                                                        '1rem',
                                                                    '&:before':
                                                                        {
                                                                            // border: '1px solid #E6E8ED',
                                                                            borderColor:
                                                                                'rgb(0,0,0,0.90)',

                                                                            backgroundColor:
                                                                                'rgb(0,0,0,0.90)',
                                                                        },
                                                                },
                                                            },
                                                            tooltip: {
                                                                sx: {
                                                                    fontSize:
                                                                        '0.8rem',
                                                                    backgroundColor:
                                                                        'rgb(0,0,0,0.90)',
                                                                    padding:
                                                                        '0.8rem 1.2rem',
                                                                    borderRadius:
                                                                        '0.7rem',
                                                                    borderWidth:
                                                                        '0px',
                                                                    borderColor:
                                                                        'rgb(0,0,0,0.90)',
                                                                },
                                                            },
                                                        }}
                                                        classes={{
                                                            arrow: {
                                                                fontSize:
                                                                    '1rem',
                                                                '&:before': {
                                                                    // border: '1px solid #E6E8ED',
                                                                    borderColor:
                                                                        'rgb(0,0,0,0.90)',

                                                                    backgroundColor:
                                                                        'rgb(0,0,0,0.90)',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {/* <span> */}
                                                            <button
                                                                disabled={
                                                                    refreshLoading
                                                                }
                                                                onClick={() => {
                                                                    setModalContent(
                                                                        () => ({
                                                                            ...props,
                                                                            profileId:
                                                                                _id,
                                                                            setTriggerRefresh,
                                                                        })
                                                                    );
                                                                    setModalCheck(
                                                                        () =>
                                                                            true
                                                                    );
                                                                }}
                                                                type="button"
                                                                className={`rounded-full p-2 transition-all hover:bg-dark-gray/30 `}
                                                            >
                                                                {icon}
                                                            </button>
                                                        {/* </span> */}
                                                    </Tooltip>
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                            </td>
                        </tr>
                    );
                }
            )}
        </table>
    );
}

export default Table;
