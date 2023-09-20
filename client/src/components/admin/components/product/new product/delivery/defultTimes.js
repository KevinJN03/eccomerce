const defaultTimes = [
    { name: 'Select your processing time...', disabled: true },
    {
        name: '1 day',
        processingTime: {
            start: 1,
            end: 1,
        },
    },
    {
        name: '1-2 day',
        processingTime: {
            start: 1,
            end: 2,
        },
    },
    {
        name: '1-3 day',
        processingTime: {
            start: 1,
            end: 3,
        },
    },
    {
        name: '3-5 day',
        processingTime: {
            start: 3,
            end: 5,
        },
    },
    { name: 'Custom range' },
];

export default defaultTimes