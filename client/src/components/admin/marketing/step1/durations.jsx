import { useState } from 'react';
import { useOfferContext } from '../../../../context/offerContext';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { HelpOutlineRounded } from '@mui/icons-material';
import { Popover, Typography } from '@mui/material';

function Durations({}) {
    const { errors, setErrors, details, setDetails, clearError, errorStyle } =
        useOfferContext();
    const [options, setOptions] = useState(() => {
        const optionsArray = [
            { property: 'start_date' },
            { property: 'end_date' },
        ];

        if (details?.offer_type == 'gift_card') {
            optionsArray.shift();
        }

        return optionsArray;
    });

    const [anchorEL, setAnchorEl] = useState(null);

    return (
        <section className="flex w-full flex-nowrap gap-5">
            <div className="left flex-1">
                <div className="flex flex-nowrap items-center gap-2">
                    <p className="text-lg font-semibold">Duration</p>
                    {details?.offer_type == 'gift_card' && (
                        <>
                            <button
                                type="button"
                                onClick={(e) =>
                                    setAnchorEl(() => e.currentTarget)
                                }
                            >
                                <HelpOutlineRounded fontSize="small" />
                            </button>

                            <Popover
                                anchorEl={anchorEL}
                                open={Boolean(anchorEL)}
                                id={'durations-popover'}
                                onClose={() => setAnchorEl(() => null)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                // sx={{
                                //     marginTop: '0.4rem',
                                // }}
                                slotProps={{
                                    paper: {
                                        style: {
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                            border: 'none',
                                            backgroundColor: 'white',
                                            padding: '1rem',
                                            borderRadius: '0.8rem',
                                            marginTop: '0.4rem',
                                            // transform: 'translate(0rem, 1rem)',
                                        },
                                    },
                                }}
                            >
                                <p className="max-w-xs">
                                    In compliance with consumer protection laws,
                                    such as the Consumer Rights Act 2015, all
                                    gift cards must remain valid for a minimum
                                    of five years from the date of issuance.
                                </p>
                            </Popover>
                        </>
                    )}
                </div>

                <p>
                    You can set a date for your code to expire, or leave it
                    open-ended.
                </p>
            </div>
            <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                {options.map(({ property }) => {
                    return (
                        <div key={property}>
                            <DatePicker
                                className=""
                                // value={
                                //     details[property]
                                //         ? dayjs(details[property])
                                //         : dayjs().year(2024)
                                // }
                                sx={{
                                    '.MuiDatePickerToolbar-root': {
                                        color: '#1565c0',
                                        borderRadius: '2px',
                                        borderWidth: '1px',
                                        borderColor: '#2196f3',
                                        border: '1px solid',
                                        backgroundColor: '#90caf9',
                                    },
                                }}
                                // minDate={
                                //     property == 'end_date'
                                //         ? dayjs
                                //               .unix(details?.start_date)
                                //               .add(1, 'day')
                                //         : dayjs()
                                // }
                                // maxDate={
                                //     property == 'start_date' &&
                                //     details?.end_date
                                //         ? dayjs
                                //               .unix(details?.end_date)
                                //               .subtract(1, 'day')
                                //         : null
                                // }
                                {...(() => {
                                    const props = {
                                        minDate:
                                            details?.offer_type == 'gift_card'
                                                ? dayjs().add(5, 'year')
                                                : property == 'end_date'
                                                  ? dayjs
                                                        .unix(
                                                            details?.start_date
                                                        )
                                                        .add(0, 'day')
                                                  : dayjs(),
                                    };

                                    if (
                                        property == 'start_date' &&
                                        details?.end_date
                                    ) {
                                        props.maxDate = dayjs
                                            .unix(details?.end_date)
                                            .subtract(0, 'day');
                                    }

                                    if (details?.[property]) {
                                        props.value = dayjs.unix(
                                            details?.[property]
                                        );
                                    } else {
                                        props.value = null;
                                    }
                                    return props;
                                })()}
                                // value={
                                //     dayjs.unix(details?.[property]) ||
                                //     dayjs()
                                // }
                                // defaultValue={`DD/MM/YYYY`}
                                disabled={
                                    property == 'end_date' &&
                                    details?.no_end_date
                                }
                                onChange={(e) => {
                                    clearError(property);
                                    setDetails((prevState) => ({
                                        ...prevState,
                                        [property]:
                                            property == 'end_date'
                                                ? e.endOf('day').utc().unix()
                                                : e.utc().unix(),
                                    }));
                                }}
                            />
                            {property == 'end_date' && (
                                <div
                                    className="mt-3 flex flex-nowrap gap-2"
                                    onClick={() => {
                                        clearError(property);
                                        clearError('start_date');

                                        setDetails((prevState) => ({
                                            ...prevState,
                                            no_end_date: !prevState.no_end_date,
                                            end_date: '',
                                        }));
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        className="daisy-checkbox !daisy-checkbox-xs !rounded-sm "
                                        readOnly
                                        checked={details.no_end_date}
                                    />
                                    <p className="cursor-pointer">
                                        No end date
                                    </p>
                                </div>
                            )}

                            {errors?.[property] && (
                                <p className="mt-2 text-red-700">
                                    {errors?.[property]}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Durations;
