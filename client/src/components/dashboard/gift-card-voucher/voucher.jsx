import { useState } from 'react';
import Input from '../../Login-SignUp/input';

function Card() {
    return (
        <section className="voucher-card !p-4 mb-4 h-fit w-56 border-2 relative ">
            <div className="top">
                <p className="font-bold tracking-wider">
                    <span>FROM:</span>
                    <span>@GLAMO.COM</span>
                </p>
            </div>
            <div className="bottom flex h-full flex-row gap-x-2">
                <div className="left min-h-full !w-[2px] !bg-primary"></div>
                <div className="right flex h-full w-full flex-col gap-y-2">
                    <div className="h-3  !bg-gray-200 w-5/6"></div>
                    <div className="h-3 w-4/6 !bg-gray-200"></div>
                    <div className=" w-fit h-fit !border-red-500 border-2 text-xs px-[3px] tracking-wider font-semibold">1234567890123456</div>
                    <div className="h-3 w-4/6 !bg-gray-200"></div>
                
                </div>
            </div>
        </section>
    );
}
function Voucher({}) {
    const [error, setError] = useState({});
    const [code, setCode] = useState('');
    const props = {
        error,
        setError,
        setValue: setCode,
        value: code,
        property: 'code',
        label: '16-DIGIT CODE',
    };
    return (
        <section className="gift-voucher bg-white p-4">
            <h2 className="mb-2 self-start text-xl font-bold">ADD GIFT VOUCHER</h2>
            <p>Enter the voucher number from the email you received.</p>
            <section className="relative mt-4 w-4/6">
                <Card/>
                <Input {...props} />
                <button className='!bg-primary opacity-95 hover:opacity-100 transition-all text-white font-bold tracking-wider w-full py-3'>
              SAVE GIFT VOUCHER
            </button>
            </section>
        </section>
    );
}

export default Voucher;
