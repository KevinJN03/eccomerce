import {
    AddRounded,
    FormatListBulletedOutlined,
    KeyboardBackspaceRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import ThemeBtn from '../../../../buttons/themeBtn.jsx';
import { useAdminOrderContext } from '../../../../../context/adminOrder.jsx';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { getName } from 'country-list';
import BubbleButton from '../../../../buttons/bubbleButton.jsx';
import ukCourierNames from './ukCouriers.js';
import UserLogout from '../../../../../hooks/userLogout.jsx';
import OptionError from '../../../components/product/new product/variation/error/optionError.jsx';
import { adminAxios } from '../../../../../api/axios.js';
import Parser from 'html-react-parser';

function AddToPackage({}) {
    const { orderInfo, setModalOpen } = useAdminOrderContext();
    const { logoutUser } = UserLogout();

    const [preview, setPreview] = useState(false);

    const [resultData, setResultData] = useState({});
    const [packageDetail, setPackageDetail] = useState({
        dispatch_date: dayjs()
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .toISOString(),
        courier: 'Royal Mail',
        tracking_number: '',
        email_me_copy: false,
    });

    const [location, setLocation] = useState(
        getName(_.get(orderInfo, 'shipping_address.address.country'))
    );

    const [showNote, setShowNote] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (preview) {
            handleAddToOrder();
        }
    }, [preview]);

    const handleAddToOrder = async () => {
        try {
            const { data } = await adminAxios.put(
                `/order/${orderInfo?._id}/shipped`,
                { ...packageDetail, preview }
            );
            console.log({ data });
            setResultData(() => data);
        } catch (error) {
            logoutUser({ error });
            console.error(error);
        }
    };

    function Brief_Info() {
        return (
            <>
                <p className="text-sm font-semibold">
                    {_.get(orderInfo, 'customer.fullName')}
                </p>

                <p>{`${_.get(orderInfo, 'shipping_address.address.city') || ''}, ${location}`}</p>

                <p>
                    {`${_.get(orderInfo, 'items.length')} ${_.get(orderInfo, 'items.length') > 1 ? 'items' : 'item'}, £${parseFloat(_.get(orderInfo, 'transaction_cost.total')).toFixed(2)}`}
                </p>
            </>
        );
    }

    return (
        <section className="relative flex  min-h-[calc(90vh)] w-full flex-col   rounded-t-3xl bg-white p-8 pb-0">
            {preview ? (
                <section className="flex flex-col gap-4">
                    <div
                        className="top group flex cursor-pointer flex-nowrap items-center gap-1"
                        onClick={() => setPreview(() => false)}
                    >
                        <div className="h-fit w-fit transition-all group-hover:translate-x-[-5px] ">
                            <KeyboardBackspaceRounded fontSize="small" />
                        </div>

                        <p className="text-lg font-medium">Back</p>
                    </div>

                    <h1 className="text-2xl font-semibold">
                        Preview buyer notification
                    </h1>

                    <div className="bottom flex w-full flex-row  gap-5 pb-32">
                        <div className=" left h-fit w-full flex-[0.5] rounded-2xl border border-green-700 bg-green-200 p-6">
                            <Brief_Info />
                        </div>
                        <div className="right w-full flex-1 ">
                            <div
                                className="border-red !rounded-2xl "
                                style={{
                                    borderRadius: '1rem',
                                     overflow: 'hidden',
                                    // width: '100%',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: _.get(resultData, 'html'),
                                }}
                            />
                            {/* {_.get(resultData, 'html') && (
                                <td>{Parser(_.get(resultData, 'html'))}</td>
                            )} */}
                            {/* <Markup content={_.get(resultData, 'html')} /> */}
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <h1 className="mb-2 text-2xl font-semibold">
                        Add a package to this order
                    </h1>
                    <p className="text-base">
                        Make sure the carrier receives this order by your
                        dispatch date.
                    </p>

                    <section className="top mt-4 flex w-full flex-row gap-16">
                        <div className="left flex-[0.5]">
                            <label className="daisy-form-control w-full max-w-xs">
                                <div className="daisy-label">
                                    <span className="daisy-label-text !text-lg font-semibold">
                                        Dispatch date
                                    </span>
                                </div>
                                <select
                                    onChange={(e) => {
                                        setPackageDetail((prevState) => ({
                                            ...prevState,
                                            dispatch_date: e.target.value,
                                        }));
                                    }}
                                    className="daisy-select daisy-select-bordered input"
                                >
                                    {[0, 1, 2].map((num) => {
                                        const date = dayjs()
                                            .add(num, 'day')
                                            .set('hour', 0)
                                            .set('minute', 0)
                                            .set('second', 0);
                                        const formatDate =
                                            date.format('ddd DD MMM');

                                        const dateToIsoString =
                                            date.toISOString();
                                        return (
                                            <option
                                                selected={
                                                    _.get(
                                                        packageDetail,
                                                        'dispatch_date'
                                                    ) == dateToIsoString
                                                }
                                                key={formatDate}
                                                value={date.toISOString()}
                                            >
                                                {formatDate}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="right flex-1">
                            <div className="flex flex-nowrap gap-5 pb-4">
                                <p className="!text-base font-semibold">
                                    Note to buyer
                                </p>
                                <FormatListBulletedOutlined />
                            </div>

                            <p className="text-black/7 pb-4">
                                We’ll add this to the email that lets your buyer
                                know their order is dispatched. You can save it
                                to use again later.
                            </p>
                            {showNote ? (
                                <textarea className=" daisy-textarea daisy-textarea-bordered h-40 !w-full min-w-full" />
                            ) : (
                                <ThemeBtn
                                    bg={'bg-light-grey'}
                                    handleClick={() => setShowNote(() => true)}
                                >
                                    <div className="flex flex-nowrap items-center gap-2">
                                        <AddRounded />
                                        <p>Add note</p>
                                    </div>
                                </ThemeBtn>
                            )}
                        </div>
                    </section>

                    <section className="package-order-container mt-10">
                        <p className="py-2 text-lg font-semibold">Order</p>
                        <p>
                            Add package details so buyers can track their order.
                        </p>

                        <section className="mt-2 flex w-full flex-row rounded-xl border p-5 ">
                            <div className="left flex-[0.5]">
                                <Brief_Info />
                            </div>
                            <div className="right flex flex-1 flex-row flex-nowrap gap-4">
                                <label className="daisy-form-control w-full max-w-xs">
                                    <div className="daisy-label !pt-0">
                                        <span className="daisy-label-text !text-sm font-medium">
                                            Delivery company{' '}
                                            <span className="text-red-800 ">
                                                *
                                            </span>
                                        </span>
                                    </div>
                                    <select
                                        className="daisy-select daisy-select-bordered input"
                                        onChange={(e) => {
                                            if (
                                                e.target.value ==
                                                'Not Available'
                                            ) {
                                                setErrors(
                                                    ({
                                                        tracking_number,
                                                        ...prevState
                                                    }) => ({ ...prevState })
                                                );
                                            }
                                            setPackageDetail((prevState) => ({
                                                ...prevState,
                                                courier: e.target.value,
                                            }));
                                        }}
                                    >
                                        {ukCourierNames.map((courier) => {
                                            return (
                                                <option
                                                    key={courier}
                                                    value={courier}
                                                    selected={
                                                        _.get(
                                                            packageDetail,
                                                            'courier'
                                                        ) == courier
                                                    }
                                                >
                                                    {courier}
                                                </option>
                                            );
                                        })}

                                        <option
                                            key={'other'}
                                            value={'Other Delivery Courier'}
                                            selected={
                                                _.get(
                                                    packageDetail,
                                                    'courier'
                                                ) == 'Other Delivery Courier'
                                            }
                                        >
                                            Other
                                        </option>

                                        <option
                                            key={'not-available'}
                                            value={'Not Available'}
                                            selected={
                                                _.get(
                                                    packageDetail,
                                                    'courier'
                                                ) == 'Not Available'
                                            }
                                        >
                                            Not available
                                        </option>
                                    </select>
                                </label>

                                <label className="daisy-form-control w-full max-w-xs">
                                    <div className="daisy-label !pt-0">
                                        <span className="daisy-label-text !text-sm font-medium">
                                            Tracking number{' '}
                                        </span>
                                    </div>
                                    <input
                                        onChange={(e) => {
                                            let trimmedValue = _.trim(
                                                e.target.value
                                            );
                                            let error = null;

                                            if (trimmedValue?.length == 0) {
                                                error =
                                                    'A tracking number is required';
                                            } else if (
                                                trimmedValue?.length < 4
                                            ) {
                                                error =
                                                    'Invalid Tracking Number';
                                            }

                                            if (error) {
                                                setErrors(
                                                    ({ ...prevState }) => ({
                                                        ...prevState,
                                                        tracking_number: error,
                                                    })
                                                );
                                            } else {
                                                setErrors(
                                                    ({
                                                        tracking_number,
                                                        ...prevState
                                                    }) => ({
                                                        ...prevState,
                                                    })
                                                );
                                            }

                                            setPackageDetail((prevState) => ({
                                                ...prevState,
                                                tracking_number: e.target.value,
                                            }));
                                        }}
                                        type="text"
                                        name="tracking-number"
                                        id="tracking-number"
                                        value={_.get(
                                            packageDetail,
                                            'tracking_number'
                                        )}
                                        className="daisy-input daisy-input-bordered input disabled:!bg-dark-gray/60 disabled:placeholder:!text-black"
                                        placeholder="Enter a tracking number"
                                        disabled={
                                            _.get(packageDetail, 'courier') ==
                                            'Not Available'
                                        }
                                    />

                                    {errors?.tracking_number && (
                                        <OptionError
                                            msg={errors?.tracking_number}
                                            disableIcon
                                            className={'px-0'}
                                        />
                                    )}
                                </label>
                            </div>
                        </section>
                    </section>
                    <footer
                        id="stickyElementFooter"
                        className=" !sticky !bottom-0 left-0 z-[1] mt-60 flex w-full flex-1 flex-row justify-between bg-white pb-6 "
                    >
                        <div className="left flex flex-row gap-4">
                            <BubbleButton
                                handleClick={() => setModalOpen(false)}
                            ></BubbleButton>

                            <div
                                onClick={() => {
                                    console.log('clicked');
                                    setPackageDetail(
                                        ({ email_me_copy, ...prevState }) => ({
                                            ...prevState,
                                            email_me_copy: !email_me_copy,
                                        })
                                    );
                                }}
                                className="flex cursor-pointer flex-row flex-nowrap items-center gap-2"
                            >
                                <input
                                    readOnly
                                    checked={_.get(
                                        packageDetail,
                                        'email_me_copy'
                                    )}
                                    type="checkbox"
                                    className="daisy-checkbox daisy-checkbox-md !rounded"
                                />
                                <p>Email me a copy of this notification</p>
                            </div>
                        </div>
                        <div className="right flex flex-nowrap items-center gap-5">
                            <BubbleButton
                                handleClick={() => {
                                    setPreview(() => true);
                                }}
                                text={'Preview buyer notification'}
                            ></BubbleButton>

                            <ThemeBtn
                                text={'Add to Order'}
                                handleClick={handleAddToOrder}
                            />
                        </div>
                    </footer>
                </>
            )}
        </section>
    );
}

export default AddToPackage;
