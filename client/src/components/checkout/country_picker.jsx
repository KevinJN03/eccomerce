import { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import ReactCountryFlag from 'react-country-flag';
function Country_Picker({}) {
    const [select, setSelect] = useState('Gb');
    const [showOption, setShowOption] = useState(false);
    const onSelect = (code) => setSelect(code);

    const handleShowOption = () => {
        setShowOption(!showOption);
    };

    // A use effect that will run wenever a select is changed
    useEffect(()=> {
        handleShowOption()
    }, [select])

    return (
        <section id="country-picker">
            <h1 className='font-bold text-lg tracking-wider mb-2'>DELIVERY COUNTRY:</h1>

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
                    <ReactFlagsSelect selected={select} onSelect={onSelect} selectedSize={20}/>
                    <button type="button" onClick={handleShowOption}>Cancel</button>
                    </>
                    
                ) : (
                    <button
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
