import { Fragment } from 'react';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';
import { cloneDeep } from 'lodash';
function CountryOrigin({}) {
    const {
        profile,
        errors,
        setProfile,
        countries,
        highlightError,
        selectedDestination,
        commonCountries,
        generateNewService,
    } = useCreateProfileContext();

    const handleOnchange = (e) => {
        const values = e.target[e.target.selectedIndex].dataset;

        setProfile((prevState) => {
            const newProfile = cloneDeep(prevState);
            newProfile.country_of_origin = values.code;
            newProfile.origin_post_code = '';
            const { standard_delivery } = newProfile;

            if (selectedDestination.has(values?.code)) {
                const findIndex = standard_delivery.findIndex(
                    (element) => element?.iso_code == values.code
                );
                const founded = standard_delivery[findIndex];
                standard_delivery.splice(findIndex, 1);
                standard_delivery.unshift(founded);
            } else {
                standard_delivery.unshift({
                    iso_code: values.code,
                    destination: values.name,
                    ...generateNewService(),
                });
            }

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

                {[
                    { array: commonCountries, field: 'commonCountries' },
                    { array: countries, field: 'countries' },
                ].map(({ array, field }) => {
                    return (
                        <Fragment key={`${field}-options`}>
                            <option disabled className="text-base font-bold">
                                ─────────
                            </option>
                            {array.map(({ name, code }) => {
                                return (
                                    <option
                                        key={`${field}-option-${code}`}
                                        selected={
                                            profile?.country_of_origin == code
                                        }
                                        data-code={code}
                                        data-name={name}
                                    >
                                        {name}
                                    </option>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </select>
        </Section>
    );
}

export default CountryOrigin;
