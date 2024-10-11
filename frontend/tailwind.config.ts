// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: ["class"], // Ensures dark mode can be enabled via a class
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         titillium: ['"Titillium Web"', "sans-serif"], // Add Titillium Web font
//       },
//       colors: {
//         // Define a black color scheme
//         background: "#000000", // Black background
//         foreground: "#FFFFFF", // White foreground for contrast
//         // You can add more colors as needed
//         black: "#000000",
//         white: "#FFFFFF",
//         gray: {
//           50: "#121212", // Very dark gray for less contrast
//           100: "#1E1E1E",
//           200: "#2D2D2D",
//           300: "#3D3D3D",
//           400: "#4D4D4D",
//           500: "#5D5D5D",
//           600: "#6D6D6D",
//           700: "#7D7D7D",
//           800: "#8D8D8D",
//           900: "#9D9D9D",
//         },
//         // Optionally add more specific colors
//       },
//       // Extend or add any specific border radius values as needed
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       // Extend or add any specific animations or keyframes
//       animation: {
//         marquee: "marquee var(--duration) linear infinite",
//         "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
//       },
//       keyframes: {
//         marquee: {
//           from: {
//             transform: "translateX(0)",
//           },
//           to: {
//             transform: "translateX(calc(-100% - var(--gap)))",
//           },
//         },
//         "marquee-vertical": {
//           from: {
//             transform: "translateY(0)",
//           },
//           to: {
//             transform: "translateY(calc(-100% - var(--gap)))",
//           },
//         },
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

// export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Corrected: "class" without array for dark mode configuration
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['"Titillium Web"', "sans-serif"], // Add Titillium Web font
      },
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          50: "#121212",
          100: "#1E1E1E",
          200: "#2D2D2D",
          300: "#3D3D3D",
          400: "#4D4D4D",
          500: "#5D5D5D",
          600: "#6D6D6D",
          700: "#7D7D7D",
          800: "#8D8D8D",
          900: "#9D9D9D",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Ensure '--radius' is defined in CSS
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite", // Ensure '--duration' is defined
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))", // Ensure '--gap' is defined
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Ensure this plugin is installed
};

export default config;
