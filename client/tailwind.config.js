/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // sans: ["Poppins", "sans-serif"]
            fontFamily: {
                "gotham": ["Gotham", "sans-serif"]
            },
            letterSpacing: {
                tightest: '-.099em',
            }
            ,
            fontSize: {
                s: '0.8rem',
                xxs: "0.7rem"
            },
            borderRadius: {
                "inherit": "inherit"
            },
        },
    },
    plugins: [
       
        require("daisyui"),
        require("rippleui"),
    ]
    // plugins: [require("daisyui")],
};
