import { ArrowDropDown, ModeEditOutlineRounded } from '@mui/icons-material';
import SeamlessDropdown from '../../common/dropdown/seamlessDropdown';
import { useRef, useState } from 'react';
import { adminAxios } from '../../../api/axios.js';
import ThemeBtn from '../../buttons/themeBtn';
import UserLogout from '../../../hooks/userLogout';
import { useContent } from '../../../context/ContentContext';

function EditOriginPostCode({
    selection,
    setShowEditOrigin,
    showEditOrigin,
    setTriggerRefresh,
    options,
}) {
    const [originPostCode, setOriginPostCode] = useState('');
    const [errors, setErrors] = useState({});
    const { setShowAlert } = useContent();

    const abortControllerRef = useRef(new AbortController());
    const { logoutUser } = UserLogout();
    const handlePostCode = async () => {
        let pass = true;
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            if (originPostCode.trim().length == 0) {
                pass = false;
                return;
            }
            const { data } = await adminAxios.post(
                '/delivery/update',
                {
                    ids: Array.from(selection),
                    origin_post_code: originPostCode,
                },
                { signal: abortControllerRef.current?.signal }
            );
            setShowAlert(() => ({
                on: true,
                bg: 'bg-blue-900',
                icon: 'check',
                size: 'medium',
                msg: data.msg,
            }));
        } catch (error) {
            logoutUser({ error });
            if (error.response.status == 404) {
                setErrors(() => error.response.data);
            }

            if ((error.response.status = 500)) {
                setShowAlert(() => ({
                    on: true,
                    bg: 'bg-red-800',
                    icon: false,
                    size: 'medium',
                    timeout: 10000,
                    msg: (
                        <>
                            <p className="text-white">
                                {error.response.data?.msg}
                            </p>

                            <ul className="mt-2 px-4 text-white">
                                {error.response.data?.failure?.map(
                                    ({ _id, name }) => {
                                        return (
                                            <li
                                                key={`failure-${_id}`}
                                                className="text-sm text-white"
                                            >
                                                {name}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </>
                    ),
                }));
            }
        } finally {
            if (pass) {
                setTriggerRefresh((prevState) => !prevState);
                setShowEditOrigin(() => false);
                setOriginPostCode(() => '');
            }
        }
    };

    return (
        <section
            className={`relative  mx-2 ${selection.size < 1 ? 'opacity-30' : 'opacity-100'}`}
        >
            <button
                disabled={selection.size < 1}
                onClick={() => setShowEditOrigin(() => true)}
                type="button"
                className=" flex flex-row items-center gap-2 rounded-full border-2 border-black p-3 disabled:cursor-not-allowed"
            >
                <ModeEditOutlineRounded />

                <p className="whitespace-nowrap text-sm ">
                    Edit origin post code
                </p>
                <ArrowDropDown />
            </button>
            {showEditOrigin && (
                <button
                    type="button"
                    className=" absolute left-0 top-0 !z-[3]  flex flex-row items-center gap-2 border-2 border-transparent p-3"
                >
                    <ModeEditOutlineRounded />

                    <p className="whitespace-nowrap text-sm ">
                        Edit origin post code
                    </p>
                    <ArrowDropDown />
                </button>
            )}

            <SeamlessDropdown
                {...{
                    setShow: setShowEditOrigin,
                    show: showEditOrigin,
                    options,
                }}
            >
                <div className="mt-12 flex flex-col gap-5 px-4 py-4">
                    <p className="text-sm ">
                        This is the post code that you dispatch your items from.
                    </p>

                    <div className="flex flex-col gap-1">
                        <p className="text-base font-semibold">
                            Origin post code
                        </p>

                        <input
                            value={originPostCode}
                            onChange={(e) => {
                                if (e.target.value.trim().length == 0) {
                                    setErrors((prevState) => ({
                                        ...prevState,
                                        origin_post_code:
                                            'Enter a valid postal code',
                                    }));
                                } else {
                                    setErrors(() => ({}));
                                }
                                setOriginPostCode(() => e.target.value);
                            }}
                            type="text"
                            className={`daisy-input daisy-input-bordered ${errors?.origin_post_code ? 'border-red-700 bg-red-100' : ''}`}
                            placeholder="EC2R 7DA"
                        />

                        {errors?.origin_post_code && (
                            <p className="mt-1 text-base text-red-700">
                                {errors?.origin_post_code ||
                                    (true && <p>123456</p>)}
                            </p>
                        )}
                    </div>

                    <div className="w-fit self-end">
                        <ThemeBtn
                            text={'Update'}
                            handleClick={handlePostCode}
                        />
                    </div>
                </div>
            </SeamlessDropdown>
        </section>
    );
}

export default EditOriginPostCode;
