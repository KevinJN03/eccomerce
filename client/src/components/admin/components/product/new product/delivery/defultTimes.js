const defaultTimes = [
    { name: 'Select your processing time...', disabled: true },
    {
        name: '1 day',
        processingTime: {
            start: 0,
            end: 1,
            type: 'days',
        },
    },
    {
        name: '1-2 days',
        processingTime: {
            start: 1,
            end: 2,
            type: 'days',
        },
    },
    {
        name: '1-3 days',
        processingTime: {
            start: 1,
            end: 3,
            type: 'days',
        },
    },
    {
        name: '3-5 days',
        processingTime: {
            start: 3,
            end: 5,
            type: 'days',
        },
    },
    { name: 'Custom range' },
];

export default defaultTimes;
