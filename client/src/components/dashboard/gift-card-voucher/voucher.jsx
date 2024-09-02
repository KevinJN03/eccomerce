import { useEffect, useRef, useState } from 'react';
import Input from '../../Login-SignUp/input';
import _ from 'lodash';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import axios from '../../../api/axios.js';
import { useNavigate } from 'react-router-dom';

function Card() {
    return (
        <section className="voucher-card relative mb-4 h-fit w-56 border-2 !p-4 ">
            <div className="top mb-1">
                <p className="font-bold tracking-wider">
                    <span className="text-[var(--grey)]">FROM:</span>
                    <span className="tracking-wider"> @GLAMO.COM</span>
                </p>
            </div>
            <div className="bottom flex h-full flex-row gap-x-2">
                <div className="left min-h-full !w-[2px] !bg-primary"></div>
                <div className="right flex h-full w-full flex-col gap-y-2">
                    <div className="h-3  w-5/6 !bg-gray-200"></div>
                    <div className="h-3 w-4/6 !bg-gray-200"></div>
                    <div className=" h-fit w-fit border-2 !border-red-500 px-[3px] text-xs font-semibold tracking-wider">
                        1234-5678-9012-3456
                    </div>
                    <div className="h-3 w-4/6 !bg-gray-200"></div>
                </div>
            </div>
        </section>
    );
}
function Voucher({}) {
    const { logoutUser, setFooterMessage } = useUserDashboardContext();
    const [error, setError] = useState({});
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleInputChange = (callback) => {
        const rawValue = callback().replace(/[^A-Za-z0-9]/g, ''); // Remove non-alphanumeric characters
        let formattedValue = rawValue.match(/.{1,4}/g)?.join('-') || '';

        // Limit to 19 characters (16 alphanumeric + 3 hyphens)
        formattedValue = formattedValue.substring(0, 19);

        setCode(() => _.toUpper(formattedValue));
        console.log({ error });
        if (formattedValue.length < 19) {
            setError((prevState) => ({
                ...prevState,
                code: 'Oops! This voucher code is not valid.',
            }));
        } else {
            setError(({ code, ...prevState }) => prevState);
        }
    };

    const save = async () => {
        let success = false;
        const errors = {};
        try {
            setLoading(() => true);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await axios.post('user/gift-card/save', {
                code,
            });
            success = true;
        } catch (error) {
            logoutUser({ error });
            console.error(error.message, error);
            _.assign(errors, error.response?.data);
        } finally {
            setTimeout(() => {
                if (success) {
                    setFooterMessage(() => ({
                        text: 'Gift voucher added',
                        success: true,
                    }));
                    navigate('/my-account/gift-cards-and-vouchers');
                } else {
                    setError(() => errors);
                }
                setLoading(() => false);
            }, 500);
        }
    };

    const props = {
        error,
        setError: (cb) => {
            console.log({ cb: cb() });
        },
        setValue: handleInputChange,
        value: code,
        property: 'code',
        label: '16-DIGIT CODE',
    };

    return (
        <section className="gift-voucher bg-white p-4">
            <h2 className="mb-2 self-start text-xl font-bold">
                ADD GIFT VOUCHER
            </h2>
            <p>Enter the voucher number from the email you received.</p>
            <section className="relative mt-4 w-4/6">
                <Card />
                <Input {...props} />
                <button
                    onClick={save}
                    disabled={loading}
                    className="box-content flex h-[1.875rem] w-full justify-center !bg-primary  py-3 font-bold opacity-95 transition-all hover:opacity-100 disabled:opacity-40"
                >
                    {loading ? (
                        <div className="spinner-simple spinner-sm ![--spinner-color:var(--slate-1)]"></div>
                    ) : (
                        <p className="flex h-full items-center  justify-center text-base tracking-wider text-white">
                            SAVE GIFT VOUCHER
                        </p>
                    )}
                </button>
            </section>
        </section>
    );
}

export default Voucher;
