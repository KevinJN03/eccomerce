const internationalOptions = 
[
    {
        courier: 'Royal Mail',
        options: [
            {
                text: 'Royal Mail International Standard',

                start: 3,
                end: 7,
            },
            {
                text: 'Royal Mail International Tracked',

                start: 3,
                end: 7,
            },
            {
                text: 'Royal Mail International Tracked & Signed',

                start: 3,
                end: 7,
            },
            {
                text: 'Royal Mail International Signed',

                start: 3,
                end: 7,
            },
        ],
    },
    {
        courier: 'DHL',
        options: [
            {
                text: 'DHL Express Worldwide',

                start: 1,
                end: 5,
            },
            {
                text: 'Packet Direct',

                start: 4,
                end: 8,
            },
        ],
    },
    {
        courier: 'Evri',
        options: [
            {
                text: 'Evri Parcelshop Standard',

                start: 1,
                end: 5,
            },
            {
                text: 'Evri Courier to Home',

                start: 3,
                end: 7,
            },
            {
                text: 'Evri International Parcel',

                start: 4,
                end: 8,
            },
        ],
    },
    {
        courier: 'DPD',
        options: [
            {
                text: 'DPD Classic',

                start: 2,
                end: 6,
            },
            {
                text: 'DPD Direct',

                start: 3,
                end: 11,
            },
            {
                text: 'DPD Air',

                start: 2,
                end: 10,
            },
        ],
    },
    {
        courier: 'FEDEX',
        options: [
            {
                text: 'FEDEX International',

                start: 2,
                end: 4,
            },
        ],
    },
    {
        courier: 'uShip',
        options: [
            {
                text: 'uSHip',

                start: 1,
                end: 5,
            },
        ],
    },
];

const UkOptions = 
[
    {
        courier: 'Royal Mail',
        options: [
            {
                text: 'Royal Mail 1st Class',

                start: 1,
                end: 1,
            },
            {
                text: 'Royal Mail Signed For 1st Class',

                start: 1,
                end: 1,
            },
            {
                text: 'Royal Mail 2nd Class',

                start: 2,
                end: 3,
            },
            {
                text: 'Royal Mail Signed For 2nd Class',

                start: 2,
                end: 3,
            },
            {
                text: 'Royal Mail Special Guaranteed by 1pm',

                start: 1,
                end: 1,
            },
        ],
    },

    {
        courier: 'Collect+',
        options: [
            {
                text: 'Collect+',

                start: 1,
                end: 1,
            },
            {
                text: 'Two Day',

                start: 2,
                end: 2,
            },
            {
                text: 'Collect+ Economy',

                start: 3,
                end: 3,
            },
        ],
    },
    {
        courier: 'DHL',
        options: [
            {
                text: 'Next Day',

                start: 1,
                end: 3,
            },
            {
                text: 'Two Day',

                start: 2,
                end: 2,
            },
            {
                text: 'Collect+ Economy',

                start: 3,
                end: 3,
            },
        ],
    },
    {
        courier: 'Evri',
        options: [
            {
                text: 'Evri Courier to Home',

                start: 2,
                end: 3,
            },
            {
                text: 'Evri Courier to Home Standard',

                start: 2,
                end: 4,
            },
            {
                text: 'Evri Shop to Home Next Day',

                start: 1,
                end: 1,
            },
            {
                text: 'Evri Postal',

                start: 2,
                end: 3,
            },
            {
                text: 'Evri Postal Next Day',

                start: 1,
                end: 1,
            },
        ],
    },

    {
        courier: 'UPS',
        options: [
            {
                text: 'UPS Express Saver® ',

                start: 1,
                end: 2,
            },
        ],
    },
    {
        courier: 'uShip',
        options: [
            {
                text: 'uSHip',

                start: 1,
                end: 5,
            },
        ],
    },
];






export { internationalOptions, UkOptions};
