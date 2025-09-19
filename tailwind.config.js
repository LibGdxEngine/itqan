// tailwind.config.js
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                kufi: ["var(--font-noto-kufi)", "sans-serif"], // custom font
                amiri: ["Amiri", "serif"],
                tajawal: ["Tajawal", "sans-serif"],
            },
        },
    },
    plugins: [],
};
