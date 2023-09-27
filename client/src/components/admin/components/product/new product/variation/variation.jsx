import AddRoundedIcon from '@mui/icons-material/AddRounded';
import New_Product_Header from '../header';
import Modal from '../../../modal/modal';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SelectVariation from './selectVariation';
function Variation() {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const toggle = () => {
        setCheck(!check);
    };

    const ModalContent = () => {
        const [content, setContent] = useState(
            <SelectVariation title={'Colour'} />
        );

    

        function Main() {
            return (
                <section className="">
                    <h1 className="mb-2">What type of variation is it?</h1>
                    <p>
                        You can add up to 2 variations. Use the variation types
                        listed here for peak discoverability. You can add a
                        custom variation, but buyers won’t see the option in
                        filters.
                    </p>

                    <div className="mb-2 mt-5 flex flex-row flex-wrap gap-3">
                        <button
                            type="button"
                            className="rounded-full !bg-[var(--light-grey)] px-4 py-2 font-gotham transition-all hover:opacity-70"
                            onClick={() =>
                                setContent(<SelectVariation title={'Colour'} />)
                            }
                        >
                            Colour
                        </button>
                        <button
                            type="button"
                            className="rounded-full !bg-[var(--light-grey)] px-4 py-2 font-gotham transition-all hover:opacity-70"
                            onClick={() =>
                                setContent(<SelectVariation title={'Size'} />)
                            }
                        >
                            Size
                        </button>
                    </div>
                    <button
                        type="button"
                        className="mb-6 mt-2 rounded-full px-3 py-2 font-gotham transition-all hover:bg-[var(--light-grey)]"
                    >
                        <AddRoundedIcon className="bg-transparent" />
                        <span className="bg-transparent">Create your Own</span>
                    </button>
                    <footer>
                        <button type="button" onClick={toggle}>
                            Cancel
                        </button>
                    </footer>
                </section>
            );
        }

        return content;
    };

    return (
        <section
            id="variations"
            className="format flex flex-row justify-between w-full relative z-[5]"
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
                    className={' !min-w-[700px] !w-full !rounded-2xl min-h-[500px]'}
                />
            )}
        </section>
    );
}

export default Variation;
