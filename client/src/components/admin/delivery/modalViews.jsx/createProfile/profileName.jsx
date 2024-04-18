import { useEffect, useState } from 'react';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';
import { useDeliveryContext } from '../../../../../context/deliveryContext';
import UserLogout from '../../../../../hooks/userLogout';

function ProfileName({}) {
    const {
        profile,
        errors,
        setErrors,
        setProfile,
        highlightError,
        allProfileNames,
        setAllProfileNames,
    } = useCreateProfileContext();
    // const { profiles, setProfiles } = useDeliveryContext();

    const { logoutUser } = UserLogout();
    const abortControllerRef = new AbortController();

    return (
        <Section
            title={`Profile name﻿`}
            errorMsg={errors?.['name']}
            noWhiteSpace
        >
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
                    } else if (
                        allProfileNames.has(e.target.value.toLowerCase().trim())
                    ) {
                        setErrors((prevState) => ({
                            ...prevState,
                            name: `You already have a profile with this name.`,
                        }));
                    } else {
                        setErrors(({ name, ...prevState }) => prevState);
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
