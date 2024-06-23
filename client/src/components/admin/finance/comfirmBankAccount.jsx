import { useRef, useState } from 'react';
import { useFinanceContext } from '../../../context/financeContext';
import BubbleButton from '../../buttons/bubbleButton';
import ThemeBtn from '../../buttons/themeBtn';
import Template from './template';
import { useAdminContext } from '../../../context/adminContext';
import { adminAxios } from '../../../api/axios';
import OptionError from '../components/product/new product/variation/error/optionError.jsx';
function ConfirmBankAccount({ setModalOpen }) {
    const { bankAccount, modalState, setModalState, setBankAccount } =
        useFinanceContext();

    const [accountNumber, setAccountNumber] = useState('');
    const { logoutUser } = useAdminContext();

    const [errors, setErrors] = useState({});

    const abortControllerRef = useRef(new AbortController());

    const [btnLoading, setBtnLoading] = useState(false);

    const handleClick = async () => {
        try {
            setBtnLoading(() => true);
            abortControllerRef.current?.abort();

            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.post(
                '/stripe/verify-bank-account',
                { account_number: accountNumber },
                {
                    signal: abortControllerRef.current.signal,
                }
            );
            setBankAccount(() => data);
            setErrors(() => ({}));
            setModalState(() => ({
                on: true,
                view: 'update_bank_details',
            }));
        } catch (error) {
            console.error(error.message, error);
            logoutUser({ error });

            if (error.response.status != 401) {
                setErrors(() => error.response.data);
            }
        } finally {
            setBtnLoading(() => false);
        }
    };
    return (
        <Template
            headerText={'Confirm bank account detail'}
            footer={{
                handleClick,
                text: 'Next',
                loading: btnLoading,
            }}
        >
            <>
                <p className="text-base">
                    To update your bank account, you’ll first need to enter the
                    full account number currently on file, ending in{' '}
                    <span className="font-medium">
                        #{bankAccount?.last4 || ''}
                    </span>
                    . This helps keep your account and funds secure. Learn more.
                </p>

                <label className="daisy-form-control w-full max-w-full">
                    <div className="daisy-label">
                        <span className="daisy-label-text !text-base font-semibold tracking-wide">
                            Account number
                            <span className="text-lg text-red-800">*</span>
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Type here"
                        className={`daisy-input daisy-input-bordered input !w-full !max-w-full ${errors?.account_number ? '!border-red-700 !bg-red-100' : ''}`}
                        onChange={(e) => setAccountNumber(() => e.target.value)}
                        autoComplete={'sort-code'}
                    />
                    <div className="daisy-label">
                        <span className="daisy-label-text-alt">
                            {/* Bottom Left label */}

                            {errors?.account_number && (
                                <OptionError
                                    className={'!items-start !gap-2 !p-0'}
                                    msg={errors?.account_number}
                                />
                            )}
                        </span>
                        {/* <span className="daisy-label-text-alt">
                                        Bottom Right label
                                    </span> */}
                    </div>
                </label>

                <p className=" text-black/70">
                    <span className="font-medium text-black/70">
                        Forgot your account number?
                    </span>{' '}
                    Contact your bank for more help.
                </p>

                <p className="mt-3 text-base">
                    <span className="!text-admin-primary-blue font-semibold">
                        Keep in mind:
                    </span>{' '}
                    To protect your account, funds from your sales will be
                    unavailable for deposit for five business days after you
                    make changes to your bank account.
                </p>
            </>
        </Template>
    );
}

export default ConfirmBankAccount;
