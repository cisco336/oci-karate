/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                btn: {
                    background: 'hsl(var(--btn-background))',
                    'background-hover': 'hsl(var(--btn-background-hover))',
                },
                primary: {
                    100: '#E6F6FF',
                    200: '#B3E0FF',
                    300: '#80C9FF',
                    400: '#4DA3FF',
                    500: '#267FFF',
                    600: '#1F66CC',
                    700: '#194D99',
                    800: '#133366',
                },
                secondary: {
                    100: '#F0F4FF',
                    200: '#D9E2FF',
                    300: '#B3C6FF',
                    400: '#8DA9FF',
                    500: '#668CFF',
                    600: '#4D70CC',
                    700: '#334D99',
                    800: '#1A3366',
                },
                danger: {
                    100: '#FFE6E6',
                    200: '#FFB3B3',
                    300: '#FF8080',
                    400: '#FF4D4D',
                    500: '#FF1A1A',
                    600: '#CC1414',
                    700: '#990F0F',
                    800: '#660A0A',
                },
                info: {
                    100: '#E6F7FF',
                    200: '#B3E9FF',
                    300: '#80DBFF',
                    400: '#4DCDFF',
                    500: '#1ABFFF',
                    600: '#1499CC',
                    700: '#0F7399',
                    800: '#0A4D66',
                },
                warning: {
                    100: '#FFF9E6',
                    200: '#FFF0B3',
                    300: '#FFE680',
                    400: '#FFDD4D',
                    500: '#FFD41A',
                    600: '#CCAA14',
                    700: '#997F0F',
                    800: '#66550A',
                },
                accent: {
                    100: '#F6E6FF',
                    200: '#E0B3FF',
                    300: '#C980FF',
                    400: '#B34DFF',
                    500: '#9C1AFF',
                    600: '#7D14CC',
                    700: '#5E0F99',
                    800: '#3F0A66',
                },
                success: {
                    100: '#E6FFE6',
                    200: '#B3FFB3',
                    300: '#80FF80',
                    400: '#4DFF4D',
                    500: '#1AFF1A',
                    600: '#14CC14',
                    700: '#0F990F',
                    800: '#0A660A',
                    900: '#084408',
                },
            },
            borderRadius: {
                // ... your border radius definitions here ...
            },
            boxShadow: {
                DEFAULT: '0 50px 40px -45px #111',
            },
            screens: {
                screens: {
                    '2xl': { min: '1535px' },
                    xl: { min: '1279px' },
                    lg: { min: '1023px' },
                    md: { min: '767px' },
                    sm: { min: '639px' },
                },
            },
            animation: {
                fadein: 'fadeIn 5s ease-in-out',
                fadeout: 'fadeOut 5s ease-in-out',
                'button-hover': 'hover:scale-105',
                keyframes: {
                    fadeOut: {
                        '0%': { opacity: 1 },
                        '100%': { opacity: 0 },
                    },
                    fadeIn: {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 1 },
                    },
                },
                content: [
                    './app/**/*.{js,ts,jsx,tsx,mdx}',
                    './components/**/*.{js,ts,jsx,tsx,mdx}',
                ],
                plugins: [],
                'button-click': 'active:scale-95',
            },
        },
    },
    plugins: [],
};
