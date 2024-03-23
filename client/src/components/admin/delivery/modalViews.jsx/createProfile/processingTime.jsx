import { Fragment, useEffect, useState } from 'react';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Section from './section';
import _ from 'lodash';

function ProcessingTime({}) {
    const {
        profile,
        setProfile,
        handleProcessingTime,
        showPTInput,
        setShowPTInput,
        errors,
        setErrors,
        highlightError,
    } = useCreateProfileContext();

    const [options, setOptions] = useState([
        { start: 1, end: 1, type: 'days' },
        { start: 1, end: 2, type: 'days' },
        { start: 1, end: 3, type: 'days' },
        { start: 3, end: 5, type: 'days' },
        { start: 5, end: 7, type: 'days' },
    ]);

    const [selectIdx, setSelect] = useState(0);

    useEffect(() => {
        if (profile?.processing_time) {
            let found = false;
            for (const [idx, { start, end, type }] of options.entries()) {
                console.log('tested');

                if (
                    profile?.processing_time?.start == start &&
                    profile?.processing_time?.end == end &&
                    profile?.processing_time?.type == type
                ) {
                    setSelect(() => idx + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                setSelect(() => options.length + 1);
                setShowPTInput(() => true);
            }
        }
    }, []);
    return (
        <Section
            noWhiteSpace
            title={`Processing time
`}
            description={`How much time

do you need to prepare an order and put it in the post? Keep in mind, shoppers have shown they're more likely to buy items that dispatch quickly.`}
            note={` Your shop's order processing schedule is set to
include: Monday–Friday.`}
        >
            <select
                onChange={handleProcessingTime}
                name="country-origin"
                id="country-origin"
                className={`daisy-select daisy-select-bordered w-full ${highlightError(['processing_time', 'general'])}`}
            >
                <option selected={selectIdx == 0} disabled>
                    Select your processing time...
                </option>
                {options.map(({ start, end, type, isCustom }, idx) => {
                    return (
                        <option
                            selected={idx + 1 == selectIdx}
                            data-start={start}
                            data-end={end}
                            data-type={type}
                        >{`${start}${end != 1 ? `-${end}` : ''} ${type}`}</option>
                    );
                })}

                <option
                    value="custom-range"
                    selected={selectIdx == options.length + 1}
                >
                    Custom range
                </option>
            </select>

            {showPTInput && (
                <div className="mt-3 flex flex-col gap-3">
                    <div className="flex w-9/12 flex-row flex-nowrap items-center gap-3">
                        {['start', 'end'].map((field, idx) => {
                            return (
                                <Fragment key={`select-${field}`}>
                                    <select
                                        onChange={(e) => {
                                            setProfile((prevState) => ({
                                                ...prevState,
                                                processing_time: {
                                                    ...prevState?.processing_time,
                                                    [field]: e.target.value,
                                                },
                                            }));
                                        }}
                                        name={`${field}-select`}
                                        id={`${field}-select`}
                                        className={`daisy-select daisy-select-bordered w-full flex-1 ${highlightError(['processing_time', field])}`}
                                    >
                                        {Array(10)
                                            .fill(1)
                                            .map((item, idx) => {
                                                return (
                                                    <option
                                                        selected={
                                                            profile
                                                                .processing_time?.[
                                                                field
                                                            ] ==
                                                            idx + 1
                                                        }
                                                        key={`option-${idx + 1}-${field}`}
                                                        value={idx + 1}
                                                    >
                                                        {idx + 1}{' '}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    {idx == 0 && <p className="text-base">-</p>}
                                </Fragment>
                            );
                        })}
                    </div>
                    <div className="flex flex-row flex-nowrap gap-4">
                        {[
                            { field: 'days', text: 'Days' },
                            {
                                field: 'weeks',
                                text: 'Weeks',
                            },
                        ].map(({ text, field }) => {
                            return (
                                <div
                                    key={`processing_time_type_${field}`}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        onClick={() =>
                                            setProfile((prevState) => ({
                                                ...prevState,
                                                processing_time: {
                                                    ...prevState?.processing_time,
                                                    type: field,
                                                },
                                            }))
                                        }
                                        checked={
                                            profile?.processing_time?.type ==
                                            field
                                        }
                                        name="processing_time_type"
                                        type="radio"
                                        id={field}
                                        className="daisy-radio"
                                    />
                                    <label
                                        htmlFor={`#${field}`}
                                        className="text-xs font-medium"
                                    >
                                        {text}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {['general', 'start', 'end'].map((element) => {
                return (
                    <Fragment key={`error-processing_time-${element}`}>
                        {_.has(errors, `processing_time.${element}`) && (
                            <p className="mt-2 text-base  text-red-800">
                                {errors['processing_time'][element]}
                            </p>
                        )}
                    </Fragment>
                );
            })}
        </Section>
    );
}

export default ProcessingTime;
