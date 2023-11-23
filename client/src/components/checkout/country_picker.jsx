import { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import ReactCountryFlag from 'react-country-flag';
import { useWindowSize } from '@uidotdev/usehooks';
function Country_Picker({ select, setSelect, disable }) {
    const screenSize = useWindowSize();

    const [showOption, setShowOption] = useState(false);
    const onSelect = (code) => setSelect(() => code);

    const handleShowOption = () => {
        setShowOption(() => true);
    };
    const handleCloseOption = () => {
        setShowOption(() => false);
    };
    // A use effect that will run wenever a select is changed
    useEffect(() => {
        handleCloseOption();
    }, [select]);

    return (
        <section id='country-picker' className={`${disable ? 'disable-component' : ''}`}>
            <h1 className="mb-2 text-lg font-bold tracking-wider">
                DELIVERY COUNTRY:
            </h1>

            <div className="country-select-container">
                <ReactCountryFlag
                    countryCode={select}
                    svg
                    style={{
                        width: '3em',
                        height: '3em',
                        borderRadius: '50%',
                    }}
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                />

                {showOption ? (
                    <>
                        <ReactFlagsSelect
                            selected={select}
                            onSelect={onSelect}
                            selectedSize={screenSize > 480 ? 20 : 14}
                        />
                        <button
                            disabled={disable}
                            type="button"
                            onClick={handleCloseOption}
                            id="checkout-change-btn"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        disabled={disable}
                        type="button"
                        id="checkout-change-btn"
                        onClick={handleShowOption}
                    >
                        CHANGE
                    </button>
                )}
            </div>
        </section>
    );
}

export default Country_Picker;
