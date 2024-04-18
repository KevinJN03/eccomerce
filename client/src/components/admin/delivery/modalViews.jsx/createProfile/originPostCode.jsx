import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';
import {
    postcodeValidator,
    postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import postCodeFormat from './postCodeFormats.json';
function OriginPostCode({}) {
    const { highlightError, profile, setProfile, errors, setErrors } =
        useCreateProfileContext();

    const handleOnchange = (e) => {
        try {
            setProfile((prevState) => ({
                ...prevState,
                origin_post_code: e.target.value,
            }));

            // console.log({
            //     exist: postcodeValidatorExistsForCountry(
            //         profile?.country_of_origin
            //     ),
            //     postcode: postcodeValidator(
            //         e.target.value?.toUpperCase(),
            //         profile?.country_of_origin
            //     ),
            // });

            if (
                postcodeValidatorExistsForCountry(profile?.country_of_origin) &&
                !postcodeValidator(
                    e.target.value?.toUpperCase(),
                    profile?.country_of_origin
                )
            ) {
                setErrors((prevState) => ({
                    ...prevState,
                    origin_post_code: 'Enter a valid postal code',
                }));

                return;
            }

            setErrors(({ origin_post_code, ...prevState }) => ({
                ...prevState,
            }));
        } catch (error) {
            console.error('error postcode', error);
        }
    };
    return (
        <Section
            errorMSg={'Enter a valid postal code'}
            noWhiteSpace
            errorMsg={errors?.['origin_post_code']}
            title={'Origin post code'}
            description={`Where will your orders dispatch from – home, the post office, or another location?`}
        >
            <input
                placeholder={postCodeFormat?.[profile?.country_of_origin]}
                value={profile?.origin_post_code}
                onChange={handleOnchange}
                name="postcode-origin"
                id="postcode-origin"
                className={`daisy-input daisy-input-bordered w-full max-w-40 placeholder:text-black/50 ${highlightError('origin_post_code')}`}
            />
        </Section>
    );
}

export default OriginPostCode;
