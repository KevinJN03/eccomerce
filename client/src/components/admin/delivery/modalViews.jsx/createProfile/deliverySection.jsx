import { Fragment } from 'react';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import DeliveryService from './deliveryService';
import BubbleButton from '../../../../buttons/bubbleButton';
import { AddRounded } from '@mui/icons-material';
import Label from './label';

function DeliverySection({}) {
    const { profile, handleDelete, setProfile, generateNewService } =
        useCreateProfileContext();
    return (
        <>
            {[
                {
                    buttonText: 'Add another location',

                    property: 'standard_delivery',
                    title: 'Standard delivery',
                    isUpgrade: false,
                    description:
                        'Where will you dispatch to? We’ll show your listings to shoppers in the countries you add here. Estimate your postage costs',
                },
                {
                    buttonText: 'Add a delivery upgrade',
                    isUpgrade: true,

                    property: 'delivery_upgrades',
                    title: 'Delivery upgrades',
                    description:
                        'Give buyers the option to choose faster delivery. We’ll add these costs to your standard pricing. Learn more',
                },
            ].map(
                (
                    {
                        title,
                        property,
                        description,

                        buttonText,
                        isUpgrade,
                        _id,
                    },
                    idx
                ) => {
                    return (
                        <Fragment key={title}>
                            <section className=" flex flex-col gap-6">
                                <Label
                                    title={title}
                                    description={description}
                                />
                            </section>

                            {profile[property]?.map((item, idx) => {
                                return (
                                    <DeliveryService
                                        key={item._id}
                                        isUpgrade={isUpgrade}
                                        property={property}
                                        service={item}
                                        index={idx}
                                        handleDelete={() =>
                                            handleDelete({
                                                property,
                                                idx,
                                                _id: item._id,
                                            })
                                        }
                                    />
                                );
                            })}

                            <BubbleButton
                                handleClick={() =>
                                    setProfile((prevState) => ({
                                        ...prevState,
                                        [property]: [
                                            ...prevState?.[property],
                                            generateNewService(),
                                        ],
                                    }))
                                }
                                className={`flex w-fit items-center px-3 py-3`}
                            >
                                <div className="flex w-fit flex-nowrap gap-2">
                                    <AddRounded />{' '}
                                    <p className="text-base font-semibold">
                                        {buttonText}
                                    </p>
                                </div>
                            </BubbleButton>

                            {idx == 0 && <hr className="bg-dark-gray" />}
                        </Fragment>
                    );
                }
            )}
        </>
    );
}

export default DeliverySection;
