import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { adminAxios } from '../api/axios';
import UserLogout from '../hooks/userLogout';
import { useContent } from './ContentContext';
import { getData, getName } from 'country-list';
import ObjectId from 'bson-objectid';

const CreateProfileContext = createContext(null);

export const useCreateProfileContext = () => {
    return useContext(CreateProfileContext);
};

function CreateProfileContextProvider({ children }) {
    const abortControllerRef = useRef();

    const timeoutRef = useRef();
    const [btnLoad, setBtnLoad] = useState(false);

    const { logoutUser } = UserLogout();

    const { modalContent, setModalCheck } = useContent();
    const [loading, setLoading] = useState(true);

    const latestStateRef = useRef();
    const [showPTInput, setShowPTInput] = useState(false);
    const [countries, setCountries] = useState(() => getData());
    const [errors, setErrors] = useState({});

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
        console.log('clicked');
        setProfile((prevState) => {
            const value = prevState?.[property];
            console.log({ value, _id });
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
        const fetchData = async () => {
            try {
                if (modalContent?.profileId) {
                    const { data } = await adminAxios.get(
                        `/delivery/${modalContent.profileId}`
                    );

                    setProfile(() => ({
                        ...data[0],
                        name:
                            modalContent?.version == 'duplicate'
                                ? `Duplicate of ${data[0]?.name}`
                                : data[0]?.name,
                    }));
                }
            } catch (error) {
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

    const handleSubmit = () => {
        timeoutRef.current = setTimeout(async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            let success = false;
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
                } else if (modalContent?.version == 'edit') {
                    const { data } = await adminAxios.put(
                        `/delivery/update/${modalContent?.profileId}`,
                        latestStateRef.current,
                        { signal: abortControllerRef.current.signal }
                    );
                }
                success = true;
            } catch (error) {
                console.error(error.response.data, 'here');

                if (error.response.status == 404) {
                    setErrors(() => error.response.data || {});
                }
                logoutUser({ error });
            } finally {
                if (success) {
                    setTimeout(() => {
                        setModalCheck(() => false);
                        modalContent?.setTriggerRefresh(
                            (prevState) => !prevState
                        );
                    }, 1000);
                } else {
                    setBtnLoad(() => false);
                }
            }
        }, 100);
    };

    const highlightError = (property) => {
        if (errors?.[property]) {
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
    };
    return (
        <CreateProfileContext.Provider value={values}>
            {children}
        </CreateProfileContext.Provider>
    );
}

export default CreateProfileContextProvider;
