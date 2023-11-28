/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

    theme: {
        extend: {
            // sans: ["Poppins", "sans-serif"]
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
              },
            colors: {
                primary: '#2d2d2d',
                'primary-green': '#018849',
                'grey-100': ' #dddddd46;',
            },
            fontFamily: {
                gotham: ['Gotham', 'sans-serif'],
                raleway: ['Raleway', ' sans-serif'],
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
        },
    },
    plugins: [require('daisyui'), require('rippleui'),  plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') }
        )
      }), ],

    daisyui: {
        prefix: 'daisy-',
    }
};
