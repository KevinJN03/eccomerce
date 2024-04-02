import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { adminAxios } from '../api/axios';
import UserLogout from '../hooks/userLogout';
import { useContent } from './ContentContext';
import { getData, getName, overwrite } from 'country-list';
import ObjectId from 'bson-objectid';
import _, { clone, cloneDeep } from 'lodash';

const CreateProfileContext = createContext(null);

export const useCreateProfileContext = () => {
    return useContext(CreateProfileContext);
};

function CreateProfileContextProvider({ children }) {
    const abortControllerRef = useRef();

    const timeoutRef = useRef();
    const [btnLoad, setBtnLoad] = useState(false);

    const { logoutUser } = UserLogout();

    const { modalContent, setModalCheck, setShowAlert } = useContent();
    const [loading, setLoading] = useState(true);

    const latestStateRef = useRef();
    const [showPTInput, setShowPTInput] = useState(false);
    const [allProfileNames, setAllProfileNames] = useState(new Set());
    const [duplicateUpgrades, setDuplicateUpgrades] = useState(new Set());
    const [countries, setCountries] = useState(() => {
        overwrite([
            {
                code: 'GB',
                name: 'United Kingdom',
            },
        ]);

        return _.orderBy(getData(), ['name'], ['asc']);
    });

    const [commonCountries, setCommonCountries] = useState(() => {
        return [
            'AU', // Australia
            'CA', // Canada
            'FR', // France
            'DE', // Germany
            'GR', // Greece
            'IN', // India
            'IT', // Italy
            'JP', // Japan
            'NZ', // New Zealand
            'PL', // Poland
            'PT', // Portugal
            'ES', // Spain
            'NL', // Netherlands
            'GB', // United Kingdom
            'US', // United States
        ].map((element) => ({ code: element, name: getName(element) }));
    });
    const [errors, setErrors] = useState({});
    const [selectedDestination, setSelectedDestination] = useState(new Set());

    const handleProcessingTime = (e) => {
        if (e.target.value == 'custom-range') {
            setProfile((prevState) => ({
                ...prevState,
                processing_time: { type: 'days', start: 1, end: 1 },
            }));
            setShowPTInput(() => true);
        } else {
            setShowPTInput(() => false);

            const { ...values } = e.target[e.target.selectedIndex].dataset;
            setProfile((prevState) => ({
                ...prevState,
                processing_time: values,
            }));
        }

        setErrors((prevState) => ({ ...prevState, processing_time: null }));
    };

    const handleDelete = ({ property, idx, _id }) => {
        setProfile((prevState) => {
            const value = prevState?.[property];

            return {
                ...prevState,
                [property]: value.filter(
                    (currentValue) => currentValue?._id != _id
                ),
            };
        });
    };

    const generateNewService = () => {
        return {
            charges: {
                one_item: '0.00',
                additional_item: '0.00',
            },

            _id: ObjectId().toHexString(),
        };
    };

    const [profile, setProfile] = useState({
        country_of_origin: 'GB',
        standard_delivery: [
            {
                iso_code: 'GB',
                destination: getName('GB'),
                disableDelete: true,
                ...generateNewService(),
            },
            {
                iso_code: 'everywhere_else',
                destination: 'Everywhere Else',
                ...generateNewService(),
            },
        ],
        delivery_upgrades: [],
    });

    useEffect(() => {
        latestStateRef.current = profile;
    }, [profile]);

    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const fetchData = async () => {
            try {
                const promiseArray = [
                    adminAxios.get('/delivery/all', {
                        signal: abortControllerRef?.current?.signal,
                    }),
                ];

                if (modalContent?.profileId) {
                    promiseArray.push(
                        adminAxios.get(`/delivery/${modalContent.profileId}`, {
                            signal: abortControllerRef.current?.signal,
                        })
                    );
                }
                const [{ data: profilesResult }, profileResult] =
                    await Promise.all(promiseArray);
                setAllProfileNames(() => {
                    const newSet = new Set(
                        profilesResult.map(({ name }) => name?.toLowerCase())
                    );
                    if (
                        _.has(profileResult, ['data', 0, 'name']) &&
                        modalContent.version == 'edit'
                    ) {
                        newSet.delete(
                            profileResult.data[0]?.name?.toLowerCase()
                        );
                    }
                    return newSet;
                });

                if (modalContent?.profileId) {
                    // setAllProfileNames((prevState) => {
                    //     const newSet = new Set(prevState)
                    //     newSet.delete(profileResult.data[0]?.name);

                    // })
                    setProfile(() => ({
                        ...profileResult.data[0],
                        name:
                            modalContent?.version == 'duplicate'
                                ? `Duplicate of ${profileResult.data[0]?.name}`
                                : profileResult.data[0]?.name,
                    }));
                }
            } catch (error) {
                console.error(error);
                logoutUser({ error });
            } finally {
                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();

            clearTimeout(timeoutRef?.current);
        };
    }, []);

    useEffect(() => {
        const delivery_codes = profile?.standard_delivery?.map(
            ({ iso_code }) => iso_code
        );

        setSelectedDestination(() => new Set(delivery_codes));
    }, [profile?.standard_delivery]);

    const duplicateTimeoutRef = useRef(null);
    useEffect(() => {
        clearTimeout(duplicateTimeoutRef.current);
        const obj = {};
        const cloneErrors = cloneDeep(errors);
        const set = new Set();
        duplicateTimeoutRef.current = setTimeout(() => {
            profile?.delivery_upgrades.forEach(
                ({ upgrade, _id, destination }) => {
                    const upgradeLC = upgrade?.toLowerCase()?.trim();
                    if (upgradeLC) {
                        if (_.get(obj, [upgradeLC, destination]) >= 1) {
                            obj[upgradeLC][destination] += 1;
                            set.add(_id);
                            _.set(
                                cloneErrors,
                                ['delivery_upgrades', _id, 'upgrade'],
                                'You already have an upgrade with this name.'
                            );
                        } else {
                            _.set(obj, [upgradeLC, destination], 1);
                            _.unset(cloneErrors, [
                                'delivery_upgrades',
                                _id,
                                'upgrade',
                            ]);
                        }
                    }
                }
            );
            setDuplicateUpgrades(() => set);

            setErrors(() => cloneErrors);
        }, 0);

        // console.log(obj);

        return () => {
            clearTimeout(duplicateTimeoutRef.current);
        };
    }, [profile?.delivery_upgrades]);

    const handleSubmit = () => {
        timeoutRef.current = setTimeout(async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            let success = false;
            let dataValue = null;

            try {
                setBtnLoad(() => true);
                if (
                    modalContent?.version == 'create' ||
                    modalContent?.version == 'duplicate'
                ) {
                    const { data } = await adminAxios.post(
                        '/delivery/create',
                        latestStateRef.current,
                        { signal: abortControllerRef.current.signal }
                    );

                    dataValue = data;
                } else if (modalContent?.version == 'edit') {
                    const { data } = await adminAxios.put(
                        `/delivery/update/${modalContent?.profileId}`,
                        latestStateRef.current,
                        { signal: abortControllerRef.current.signal }
                    );
                    dataValue = data;
                }

                success = true;
            } catch (error) {
                logoutUser({ error });
                if (error.response.status == 404) {
                    setErrors(() => error.response.data || {});
                }

                if (error.response.status == 500) {
                    setModalCheck(() => false);

                    setShowAlert(() => ({
                        on: true,
                        bg: 'bg-red-900',
                        icon: 'sadFace',
                        msg: 'We could not update your profile.',
                        size: 'medium',
                    }));
                }
            } finally {
                if (success) {
                    setTimeout(() => {
                        if (modalContent?.button?.handleClick) {
                            modalContent?.button?.handleClick({
                                ...dataValue,
                                active_listings: profile?.active_listings,
                            });
                        }

                        if (modalContent?.setTriggerRefresh) {
                            modalContent?.setTriggerRefresh(
                                (prevState) => !prevState
                            );
                        }

                        setShowAlert(() => ({
                            msg: `Your delivery profile has been ${modalContent?.version == 'edit' ? 'updated' : 'created'}.`,
                            size: 'medium',
                            bg: 'bg-blue-900',
                            icon: 'check',
                            small: true,
                            on: true,
                        }));
                        setModalCheck(() => false);
                    }, 1000);
                } else {
                    setBtnLoad(() => false);
                }
            }
        }, 100);
    };

    const highlightError = (property) => {
        if (_.has(errors, property)) {
            return 'border-red-700 bg-red-100';
        }
    };

    const values = {
        handleSubmit,
        btnLoad,
        setBtnLoad,

        profile,
        setProfile,
        showPTInput,
        setShowPTInput,
        countries,
        handleProcessingTime,
        handleDelete,
        errors,
        setErrors,
        generateNewService,
        loading,
        highlightError,
        selectedDestination,
        commonCountries,
        allProfileNames,
        setAllProfileNames,
        duplicateUpgrades,
        setDuplicateUpgrades,
    };
    return (
        <CreateProfileContext.Provider value={values}>
            {children}
        </CreateProfileContext.Provider>
    );
}

export default CreateProfileContextProvider;
