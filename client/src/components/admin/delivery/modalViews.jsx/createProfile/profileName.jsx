import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';

function ProfileName({}) {
    const { profile, errors, setErrors, setProfile, highlightError } =
        useCreateProfileContext();
    return (
        <Section title={`Profile name﻿`} errorMsg={errors?.['name']}>
            <input
                value={profile?.name}
                onChange={(e) => {
                    const trimmedValue = e.target.value?.trim();

                    if (e.target.value.length == 0) {
                        setErrors((prevState) => ({
                            ...prevState,
                            name: `Profile name must be between 1 and 128 characters.
                                                            `,
                        }));
                    } else if (trimmedValue.length == 0) {
                        setErrors((prevState) => ({
                            ...prevState,
                            name: `Profile name can't be only spaces.`,
                        }));
                    } else {
                        setErrors((prevState) => ({
                            ...prevState,
                            name: null,
                        }));
                    }
                    setProfile((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                    }));
                }}
                type="text"
                className={`daisy-input daisy-input-bordered w-full ${highlightError('name')}`}
            />
        </Section>
    );
}

export default ProfileName;
