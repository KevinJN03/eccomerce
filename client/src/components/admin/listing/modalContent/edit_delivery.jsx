import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import { useEffect, useRef, useState } from 'react';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios.js';
import _ from 'lodash';
import { handleTimeout, handleUpdateProduct } from './handleTimeout';
function Edit_Delivery({}) {
    const [profiles, setProfiles] = useState([]);

    const [select, setSelect] = useState('');
    const [profileMap, setProfileMap] = useState(new Map());
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState();
    const { modalContent, setModalCheck, setShowAlert } = useContent();
    const navigate = useNavigate();
    const { logoutUser } = UserLogout();
    const abortControllerRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            try {
                const { data } = await adminAxios('/delivery/all', {
                    signal: abortControllerRef.current?.signal,
                });

                setProfiles(() => data);
                setProfileMap(
                    () => new Map(data.map((element) => [element._id, element]))
                );
            } catch (error) {
                logoutUser({ error });
                console.error(error);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const apply = async () => {
        let success = false;
        let count = null;
        try {
            setBtnLoading(() => true);
            const { data } = await adminAxios.post(
                '/product/delivery/update',
                { ids: modalContent.productIds, deliveryProfileId: select },
                {
                    signal: abortControllerRef.current?.signal,
                }
            );

            success = true;
            count = data.count;
        } catch (error) {
            console.error(error);
            logoutUser({ error });
        } finally {
            const handleFunc = () => {
                modalContent?.clearSelection && modalContent?.clearSelection();
            };

            handleTimeout({
                setBtnLoading,
                setLoading,
                success,
                count,
                setModalCheck,
                handleFunc,
                setShowAlert,
                msg: 'Oh dear! Something went wrong - please try again.',
            });
        }
    };
    return (
        <Template
            loading={loading}
            submit={{ text: 'Apply', handleClick: apply, loading: btnLoading }}
            small
            title={
                <p>
                    Apply Delivery Profile to {modalContent?.productIds?.length}{' '}
                    listing
                </p>
            }
        >
            <select
                name="delivery-profile"
                id="delivery-profile"
                className="daisy-input daisy-input-bordered h-10 rounded-sm  text-sm"
                onChange={(e) => {
                    setSelect(() => e.target.value);
                }}
            >
                <option disabled selected>
                    Select profile...
                </option>
                <option disabled className="text-black">
                    -------------------
                </option>
                {profiles.map(({ _id, name }) => {
                    return (
                        <option selected={_id == select} value={_id} key={_id}>
                            {name}
                        </option>
                    );
                })}
            </select>

            {select && (
                <>
                    <div className="mt-2">
                        <p className="text-sm font-semibold">Processing time</p>
                        <p className="text-sm ">
                            {`${profileMap.get(select)?.processing_time?.start == profileMap.get(select)?.processing_time?.end ? profileMap.get(select)?.processing_time?.end : `${profileMap.get(select)?.processing_time?.start}-${profileMap.get(select)?.processing_time?.end}`} business ${profileMap.get(select)?.processing_time?.type}`}
                        </p>{' '}
                        <div className="mt-1">
                            <p className="text-sm font-semibold ">
                                Delivers to
                            </p>

                            {profileMap
                                .get(select)
                                ?.standard_delivery?.map(
                                    ({ _id, destination, charges }) => {
                                        return (
                                            <p
                                                key={_id}
                                                className="flex flex-row flex-nowrap justify-between text-sm"
                                            >
                                                {destination}{' '}
                                                <span>
                                                    £
                                                    {parseFloat(
                                                        charges?.one_item
                                                    ).toFixed(2)}
                                                </span>
                                            </p>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    {!_.isEmpty(profileMap.get(select)?.delivery_upgrades) && (
                        <p className="text-sm">+ upgrades</p>
                    )}
                </>
            )}

            <Link
                to={'/admin/delivery'}
                className="mt-3 w-fit  text-sm underline"
                onClick={() => {
                    setModalCheck(() => false);
                }}
            >
                Edit delivery profiles
            </Link>
        </Template>
    );
}

export default Edit_Delivery;
