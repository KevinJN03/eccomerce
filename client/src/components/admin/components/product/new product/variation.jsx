import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from './header';
import Modal from '../../modal/modal';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function Variation() {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const toggle = () => {
        setCheck(!check);
    };

    const ModalContent = () => {
        return (
            <section className="">
                <h1>What type of variation is it?</h1>
                <p>
                    You can add up to 2 variations. Use the variation types
                    listed here for peak discoverability. You can add a custom
                    variation, but buyers won’t see the option in filters.
                </p>

                <div  className='flex flex-row gap-3 mt-5 mb-2 flex-wrap'>
                    <button type="button" className='py-2 px-4 !bg-[var(--light-grey)] font-gotham rounded-full'>Colour</button>
                    <button type="button" className='py-2 px-4 !bg-[var(--light-grey)] font-gotham rounded-full'>Size</button>
                 
                </div>
                <button type="button" className='py-2 px-4 hover:bg-[var(--light-grey)] transition-all font-gotham rounded-full'>add</button>
                <footer>
                    <button type='button' onClick={toggle}>Cancel</button>

                </footer>
            </section>
        );
    };
    return (
        <section
            id="variations"
            className="format flex flex-row justify-between"
        >
          
                <New_Product_Header
                    title={'Variations'}
                    text={
                        'If your item is offered in different colours, sizes, materials,etc.'
                    }
                />
                <button
                    type="button"
                    onClick={toggle}
                    className="rounded-full border-2 border-black px-3 py-2"
                >
                    <AddRoundedIcon />
                    <span>Add Variations</span>
                </button>
                {check && (
                <Modal
                    check={check}
                    setCheck={setCheck}
                    ModalContent={<ModalContent />}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
           
        </section>
    );
}

export default Variation;
