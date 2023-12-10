export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                solitaireBg: "#0b421a",
                minesweeperTileBg: "#dcdcdc",
                minesweeperDigitalRed: "#FB0007",
            },
            fontFamily: {
                digital: ["Digital-7", "sans-serif"],
            },
        },
    },
    plugins: [],
};
