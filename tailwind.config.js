/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, e }) {
      const newUtilities = {
        [`.${e("underline-effect")}`]: {
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            width: "0",
            height: "2px",
            bottom: "-2px",
            left: "0",
            backgroundColor: "currentColor",
            transition: "width 0.3s ease-in-out",
          },
          "&:hover::after, &.active::after": {
            width: "100%",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
