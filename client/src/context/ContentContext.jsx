import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { adminAxios } from '../api/axios.js';
import UserLogout from '../hooks/userLogout';
import _ from 'lodash';
const ContentContext = createContext(null);
export const useContent = () => {
    return useContext(ContentContext);
};
const reducer = (state, action) => {
    if (action.type === 'Edit') {
        return { ...state, type: action.type, profile: action.profile };
    }
    if (action.type === 'Main' || action.type === 'New') {
        return { ...state, type: action.type, profile: null };
    }
    if (action.type == 'clear') {
        return null;
    }
};
export function ContentProvider({ children, value }) {
    const { logoutUser } = UserLogout();
    const [content, contentDispatch] = useReducer(reducer, { type: 'Main' });
    const [profile, setProfile] = useState([]);

    const [additionalSideBar, setAdditionalSideBar] = useState({
        title: 'FINANCES',
        options: [],
        on: false,
    });
    const [loading, setLoading] = useState(false);
    const { setShowAlert, setModalCheck } = value;
    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [content]);

    const fetchSetting = async ({
        setPostageSetting,
        setLoading: setLoadState,
    }) => {
        try {
            const { data } = await adminAxios.get(`/setting?property=delivery`);

            setPostageSetting(() => data?.delivery || {});
        } catch (error) {
            console.error(error);
            logoutUser({ error });
        } finally {
            setTimeout(() => {
                setLoadState && setLoadState(() => false);
            }, 500);
        }
    };

    const save = async ({
        setBtnLoad,
        postageSetting,
        msg,
        handleFunc,
        setErrors,
    }) => {
        let success = false;
        try {
            setBtnLoad && setBtnLoad(() => true);
            const { data } = await adminAxios.put('setting/update', {
                name: 'general',
                delivery: postageSetting,
                property: 'delivery',
            });
            success = true;
        } catch (error) {
            console.error(error);
            logoutUser({ error });

            if (error.response.status == 404) {
                setErrors && setErrors(() => error.response?.data || {});
            }
        } finally {
            setTimeout(() => {
                if (success) {
                    setShowAlert(() => ({
                        msg: msg || `You've updated your options.`,
                        size: 'medium',
                        bg: 'bg-blue-900',
                        icon: 'check',
                        small: true,
                        on: true,
                    }));
                }
                handleFunc && handleFunc();

                setBtnLoad && setBtnLoad(() => false);
                setModalCheck(() => false);
            }, 500);
        }
    };

    const handleCancel = async ({
        info,
        setBtnLoading,
        abortControllerRef,
        setErrors,
        setSuccess,
        id,
    }) => {
        let isSuccessful = false;
        try {
            setBtnLoading(() => true);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.post(
                `/order/${id}/cancelled`,
                { ...info },
                { signal: abortControllerRef.current.signal }
            );
            isSuccessful = true;
        } catch (error) {
            logoutUser({ error });
            isSuccessful = false;
            setErrors(() => error?.response?.data);
            if (error?.response?.status == 400) {
                window.scrollTo(0, 0);
            } else {
                setShowAlert(() => ({
                    on: true,
                    size: 'medium',
                    bg: 'bg-red-900',
                    icon: 'sadFace',
                    msg: _.get(error, 'response.data.msg.0'),
                }));
            }
            setBtnLoading(() => false);
        } finally {
            if (isSuccessful) {
                setTimeout(() => {
                    setSuccess(() => true);
                    setBtnLoading(() => false);
                }, 600);
            }
        }
    };
    const newValue = {
        ...value,
        profile,
        setProfile,
        loading,
        setLoading,
        fetchSetting,
        save,
        handleCancel,
        additionalSideBar,
        setAdditionalSideBar,
    };
    return (
        <ContentContext.Provider value={newValue}>
            {children}
        </ContentContext.Provider>
    );
}
