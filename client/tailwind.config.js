/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"
import rippleui from 'rippleui';


export default {

    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    // daisyui: {
    //     prefix: "daisy"
    // },
    // plugins: [daisyui, 
    //  rippleui
    // ],
 
    theme: {
        extend: {
            // sans: ["Poppins", "sans-serif"]

            minHeight: {
                main: 'calc(100vh-(6.75rem_+_3.75rem))',
            },
            textShadow: {   
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
            colors: {
                'admin-primary-blue': '#4d6bc6',
                'primary-gray': '#525050',
                'primary-2': '#525050',
                primary: '#2d2d2d',
                'admin-primary': '#003e29',
                'primary-green': '#018849',
                'grey-100': '#dddddd46;',
                // 'dark-gray': '#676666',
                'dark-gray': '#939393',
                'light-grey': '#eee',
                'admin-accent': '#4d6bc6',
            },
            fontFamily: {
                gotham: ['Gotham', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
                EBGaramond: ['EB Garamond', 'sans-serif'],
            },
            letterSpacing: {
                tightest: '-.099em',
            },
            fontSize: {
                s: '0.8rem',
                xxs: '0.7rem',
            },
            borderRadius: {
                inherit: 'inherit',
            },

            boxShadow: {
                'my-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                '3xl': '0px 5px 10px rgba(0, 0, 0, 0.35)',
                'inner-2': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.15) ',
                normal: '0px 2px 10px rgba(0,0,0,0.35)',
            },

            spacing: {
                70: '17rem',
                70.1: '17.1rem',
                700: '700px',
            },
        },

        screens: {
            sm: { max: '480px' },

            md: { min: '481px', max: '980px' },

            'sm+md': { max: '980px' },

            lg: '1024px',

            'md+lg': '481px',
            'max-h-lg': { raw: '(max-height: 900px)' },
        },
    },

    plugins: [daisyui, rippleui],

    daisyui: {
        prefix: 'daisy-',
    },

};
 