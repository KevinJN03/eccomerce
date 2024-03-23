import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';
import { cloneDeep } from 'lodash';
function CountryOrigin({}) {
    const { profile, errors, setProfile, countries, highlightError } =
        useCreateProfileContext();

    const handleOnchange = (e) => {
        const values = e.target[e.target.selectedIndex].dataset;

        setProfile((prevState) => {
            const newProfile = cloneDeep(prevState);
            newProfile.country_of_origin = values.code;
            newProfile.origin_post_code = '';
            newProfile['standard_delivery'][0]['destination'] = values.name;
            newProfile['standard_delivery'][0]['iso_code'] = values.code;

            return newProfile;
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
