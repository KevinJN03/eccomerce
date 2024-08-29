import _ from 'lodash';
import { useOfferContext } from '../../../../context/offerContext';
import SelectedListings from '../selectedListings';
import { Modal } from '@mui/material';
import BoxWithProps from '../../../common/BoxwithProps';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useAdminContext } from '../../../../context/adminContext';
import { adminAxios } from '../../../../api/axios';
import Step4 from '../step4';
import { useContent } from '../../../../context/ContentContext';

function IncludedListings({
    setOpenListingsModal,
    isUpdated,
    setIsUpdated,
    setDetails,
    setChosenListings,
    setCount,
}) {
    const {
        chosenListings,
        details,
        listingIdsSet,
        btnLoading,
        setBtnLoading,
        generateMapFromOffers,
        categoriesMap,
        convertMapToArray,
        count,
    } = useOfferContext();

    const [modalOpen, setModalOpen] = useState(false);
    const [includedListings, setIncludedListings] = useState(0);

    const { logoutUser } = useAdminContext();

    const { setShowAlert } = useContent();

    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
            setIsUpdated(() => false);
        };
    }, []);

    const handleSave = async () => {
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.post('/offer/update/listings', {
                id: details._id,
                listings: Array.from(listingIdsSet),
            });

            setDetails(() => data[0]);
            // const { newChosenMap, newListingIdSet } = generateMapFromOffers({
            //     offerData: data[0],
            //     newCategoryMap: _.cloneDeep(categoriesMap),
            // });

            // const { mapToArray, newCount } = convertMapToArray({
            //     mapState: newChosenMap,
            // });

            setChosenListings(() => chosenListings);
            setCount(() => includedListings);

            // setCount(() => newCount);

            setIsUpdated(() => true);
        } catch (error) {
            console.error(error.message, error);
            logoutUser({ error });

            if (error.response?.status == 400) {
                setShowAlert(() => ({
                    on: true,
                    size: 'large',
                    icon: 'sadFace',
                    msg: 'Oops! A stitch has gone awry. Please try again.',
                    text: 'text-white',
                    bg: 'bg-red-700 !py-3',
                }));
            }
        } finally {
            setBtnLoading(() => false);
        }
    };

    useEffect(() => {
        setIncludedListings(() =>
            _.reduce(
                chosenListings,
                (sum, value) => {
                    return sum + value.listings?.length || 0;
                },
                0
            )
        );
    }, [chosenListings]);
    return (
        <Fragment>
            {isUpdated ? (
                <Step4 handleDone={() => setOpenListingsModal(() => false)} />
            ) : (
                <section className="w-full max-w-[85.375rem]">
                    <header className=" border-b border-dark-gray p-7">
                        <h2 className="text-xl font-semibold ">
                            Choose listings for discount
                        </h2>
                    </header>
                    <body className="mt-5 flex flex-col px-32">
                        <h2 className="text-xl font-semibold">
                            Included Listings ({includedListings})
                        </h2>

                        <p className="text-base">
                            Choose which listings will be eligible for the
                            discount. You can start by adding all your listings,
                            and easily narrow it down from there if you want to
                            exclude any items.
                        </p>

                        <SelectedListings />
                        <Modal
                            open={modalOpen}
                            onClose={() => setModalOpen(() => false)}
                        >
                            <BoxWithProps
                                customSx={{
                                    top: '15%',
                                    left: '50%',

                                    transform: 'translate(-50%, -0%)',
                                    // backgroundColor: 'white',
                                    maxWidth: '25rem',
                                    width: '100%',
                                }}
                            >
                                <section className="rounded-sm bg-white">
                                    <header className="border-b border-dark-gray/50 px-5 py-3">
                                        <p className="text-base font-semibold">
                                            Are you sure?
                                        </p>
                                    </header>
                                    <body className="p-5">
                                        <p className="text-sm text-black/70">
                                            You haven’t saved your changes. You
                                            will lose any info you changed if
                                            you cancel.
                                        </p>
                                    </body>
                                    <footer className="flex flex-nowrap justify-end gap-3 border-t border-t-dark-gray/50 px-3 py-4">
                                        <button
                                            type="button"
                                            className="rounded border border-black p-2 text-sm font-semibold transition-all hover:bg-dark-gray/20"
                                            onClick={() => {
                                                setOpenListingsModal(
                                                    () => false
                                                );
                                            }}
                                        >
                                            Discard Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded border border-black bg-black p-2 text-sm font-semibold text-white hover:bg-black/80"
                                            onClick={() => {
                                                setModalOpen(() => false);
                                            }}
                                        >
                                            Keep editing
                                        </button>
                                    </footer>
                                </section>
                            </BoxWithProps>
                        </Modal>
                    </body>
                    <footer className="flex justify-between border-t border-t-dark-gray px-14 py-5">
                        <button
                            type="button"
                            className="rounded-sm border border-dark-gray p-2 text-sm font-medium hover:bg-dark-gray/30"
                            onClick={() => setModalOpen(() => true)}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            type="button"
                            disabled={btnLoading}
                            className="rounded-sm border border-black bg-black p-2 text-sm font-medium text-white transition-all hover:bg-black/80 disabled:bg-black/60"
                        >
                            {btnLoading ? (
                                <div className="spinner-circle spinner-xs ![--spinner-color:255_255_255]"></div>
                            ) : (
                                'Save changes'
                            )}
                        </button>
                    </footer>{' '}
                </section>
            )}
        </Fragment>
    );
}

export default IncludedListings;
