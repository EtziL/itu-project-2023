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
                silkScreen: ["Silkscreen", "sans-serif"],
            },
            animation: {
                flyUp: "flyUp 1s ease infinite",
            },
            keyframes: {
                flyUp: {
                    "0%": {
                        transform: "translateY(0)",
                        opacity: 1,
                    },
                    "100%": {
                        transform: "translateY(-250px)",
                        opacity: 0,
                    },
                },
            },
        },
    },
    plugins: [],
};
