import { useEffect, useRef, useState } from 'react';
import BubbleButton from '../../../buttons/bubbleButton';
import { useContent } from '../../../../context/ContentContext';
import ThemeBtn from '../../../buttons/themeBtn';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';

function DeleteProfile({}) {
    const { setModalCheck, modalContent, setShowAlert } = useContent();
    const abortControllerRef = useRef(new AbortController());
    const { logoutUser } = UserLogout();

    const [loading, setLoading] = useState(true);
    const handleDelete = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        let success = false;
        setLoading(() => true);
        try {
            const { data } = adminAxios.delete(
                `/delete/delivery/${modalContent?.profileId}`,
                {
                    signal: abortControllerRef.current?.signal,
                }
            );
            success = true;
        } catch (error) {
            logoutUser({ error });
        } finally {
            if (success) {
                setTimeout(() => {
                    setModalCheck(() => false);
                    modalContent?.setTriggerRefresh((prevState) => !prevState);
                    setShowAlert(() => ({
                        msg: 'Your delivery profile has been deleted.',
                        size: 'medium',
                        bg: 'bg-blue-900',
                        icon: 'check',
                        small: true,
                        on: true,
                    }));
                }, 1000);
            }
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(() => false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
            abortControllerRef.current?.abort();
        };
    }, []);
    return (
        <section className="flex !w-[27rem] !max-w-[100rem] flex-col gap-4 rounded-3xl bg-white p-8">
            <h1 className="font-EBGaramond text-4xl">
                Delete delivery profiles
            </h1>

            {loading ? (
                <div className=" flex h-24 items-center justify-center">
                    <div className="spinner-circle spinner-md ![--spinner-color:0,0,0]" />
                </div>
            ) : (
                <p className="text-sm">
                    Are you sure you want to delete this profile?
                </p>
            )}
            <footer className="mt-6 flex w-full justify-between">
                <BubbleButton handleClick={() => setModalCheck(() => false)} />
                <ThemeBtn text={'Delete profile'} handleClick={handleDelete} />
            </footer>
        </section>
    );
}

export default DeleteProfile;
