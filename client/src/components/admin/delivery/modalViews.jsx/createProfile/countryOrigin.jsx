import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';
import { cloneDeep } from 'lodash';
function CountryOrigin({}) {
    const { profile, errors, setProfile, countries, highlightError } =
        useCreateProfileContext();

    const handleOnchange = (e) => {
        const values = e.target[e.target.selectedIndex].dataset;

        setProfile((prevState) => {
            const newStandardDelivery = cloneDeep(prevState.standard_delivery);

            newStandardDelivery[0] = {
                destination: values.name,
                iso_code: values.code,
            };
            console.log(newStandardDelivery[0]);
            return {
                ...prevState,
                country_of_origin: values.code,
                standard_delivery: newStandardDelivery,
                origin_post_code: '',
            };
        });
    };
    return (
        <Section
            title={'Country of origin'}
            description={`The country you're dispatching from`}
            noWhiteSpace
            errorMsg={errors?.['country_of_origin']}
        >
            <select
                onChange={handleOnchange}
                name="country-origin"
                id="country-origin"
                className={`daisy-select daisy-select-bordered w-full ${highlightError('country_of_origin')}`}
            >
                <option disabled>Select a location</option>
                {countries.map(({ code, name }) => {
                    return (
                        <option
                            selected={code == profile?.country_of_origin}
                            data-code={code}
                            data-name={name}
                        >
                            {name}
                        </option>
                    );
                })}
            </select>
        </Section>
    );
}

export default CountryOrigin;
