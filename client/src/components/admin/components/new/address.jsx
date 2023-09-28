import ReactFlagsSelect from 'react-flags-select';
import { useEffect, useState } from 'react';
import FormInput from './formInput';

import { getName, getCode } from 'country-list';
function Address({ states }) {
    const [selected, setSelected] = useState('GB');
    const { address, setAddress } = states[6];
    useEffect(() => {
        let { country } = address;
        console.log("here 2",{country})
        const newCode = getCode(`${country}`);
        console.log(newCode);
        if (newCode) {
            setSelected(newCode)
        }
        // console.log("here", address.country, newCode)
        // setSelected(getCode(address.country))
    }, []);
    const addressFields = [
        {
            type: 'text',
            label: 'Line 1',
            placeholder: 'Flat 8',
        },
        {
            type: 'text',
            label: 'Line 2',
            placeholder: '25 Balmoral Lane',
        },

        {
            type: 'text',
            label: 'City',
            placeholder: 'London',
        },
        {
            type: 'text',
            label: 'County',
            placeholder: 'Orpington',
        },
        {
            type: 'text',
            label: 'PostCode',
            placeholder: 'BR2 6DX',
        },
    ];

    const handleSelect = (code) => {
        setSelected(code);
        setAddress({ ...address, country: getName(code) });
    };
    return (
        <section className="flex w-full">
            <div className="formInput flex flex-col gap-3 self-start">
                <label className="mb-2">Address</label>
                {addressFields.map((field) => {
                    const { type, label, placeholder } = field;
                    const newLabel = label.toLowerCase().replaceAll(' ', '');
                    return (
                        <span>
                            <label className="text-sm " htmlFor="address1">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                id="line1"
                                placeholder={placeholder}
                                value={address[`${newLabel}`]}
                                onChange={(e) =>
                                    setAddress({
                                        ...address,
                                        [`${newLabel}`]: e.target.value,
                                    })
                                }
                            />
                        </span>
                    );
                })}

                <ReactFlagsSelect
                    selected={selected}
                    onSelect={(code) => handleSelect(code)}
                />
            </div>
        </section>
    );
}

export default Address;
