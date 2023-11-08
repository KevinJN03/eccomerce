import { useState } from 'react';
import gift_card_svg from '../../../assets/icons/gift-card-back.svg';
import Input from '../../Login-SignUp/input';

function Card({}) {
    const [error, setError] = useState({});
    const [code, setCode] = useState('');
    const [pin, setPin] = useState('');
    const errorProps = {
        error,
        setError,
    };
    return (
        <section className="add-gift-card bg-white p-4">
            <h2 className="mb-2 self-start text-xl font-bold">ADD GIFT CARD</h2>
            <p>
                Enter the long number and scratch off the panel on your card to
                reveal your pin as shown below.
            </p>
            <img src={gift_card_svg} className="mt-6 h-auto w-56" />
<div className='w-4/6 mt-8'>
   <Input
                {...errorProps}
                value={code}
                setValue={setCode}
                property={'code'}
                label={'16-DIGIT CODE'}
            />
             <Input
                {...errorProps}
                value={pin}
                setValue={setPin}
                property={'pin'}
                label={'4-DIGIT PIN'}
            />

            <button className='!bg-primary opacity-95 hover:opacity-100 transition-all text-white font-bold tracking-wider w-full py-3'>
              SAVE GIFT CARD
            </button>
</div>
           
        </section>
    );
}

export default Card;
