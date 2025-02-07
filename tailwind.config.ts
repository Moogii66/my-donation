import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        black: ["Averta Black", "sans-serif"],
        bold: ["Averta Bold", "sans-serif"],
        extra_thin: ["Averta Extra Thin", "sans-serif"],
        extrabold: ["Averta ExtraBold", "sans-serif"],
        light: ["Averta Light", "sans-serif"],
        regular: ["Averta Regular", "sans-serif"],
        semibold: ["Averta SemiBold", "sans-serif"],
        thin: ["Averta Thin", "sans-serif"],
      },

      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        32: "32px",
        42: "42px",
        48: "48px",
      },

      colors: {
        primary: "#2B7F75",
        primary100: "#D7F8E8",
        primary200: "#B2F2D8",
        primary300: "#82D8BE",
        primary400: "#59B29F",
        primary500: "#2B7F75",
        primary600: "#1F6D6B",
        primary700: "#15565B",
        primary800: "#0D4049",
        primary900: "#082F3C",

        secondary100: "#EDF1F3",
        secondary200: "#DCE4E8",
        secondary300: "#ACB5BB",
        secondary400: "#6C7278",
        secondary500: "#1A1C1E",
        secondary600: "#131619",
        secondary700: "#0D1015",
        secondary800: "#080B11",
        secondary900: "#04070E",

        success100: "#F5FCD2",
        success200: "#E8FAA6",
        success300: "#D3F178",
        success400: "#BCE455",
        success500: "#9CD323",
        success600: "#7FB519",
        success700: "#659711",
        success800: "#4C7A0B",
        success900: "#3B6506",

        mainGreen: "#00C73C",

        error100: "#FCD7D4",
        error200: "#FAABAD",
        error300: "#F07E8D",
        error400: "#E15C7A",
        error500: "#CE2C60",
        error600: "#B1205C",
        error700: "#941657",
        error800: "#770E4E",
        error900: "#620849",

        warning100: "#FFFAE1",
        warning200: "#FFF3C3",
        warning300: "#FFEBA6",
        warning400: "#FFE390",
        warning500: "#FFD66B",
        warning600: "#DBB04E",
        warning700: "#B78C35",
        warning800: "#936A22",
        warning900: "#7A5214",

        information100: "#DCF3FF",
        information200: "#BAE5FF",
        information300: "#98D3FF",
        information400: "#7EC2FF",
        information500: "#54A6FF",
        information600: "#3D81DB",
        information700: "#2A60B7",
        information800: "#1A4393",
        information900: "#102E7A",

        primaryLight: "#F1F6EE",
        backgroundLight: "#F9FAFB",

        progressView: "#F3F4F6",
        divider: "#DCE4E8",
        light: {
          DEFAULT: "#FAFBFC",
          lighter: "#F3F4F6",
        },
        text: {
          primary: "#1C2634",
          secondary: "#6C7278",
        },
        //
        border: "#DCE4E8",
        tableHead: "#F8FAFC",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))'
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      animation: {
        scrollUp: "scrollUp 40s linear infinite",
        scrollDown: "scrollDown 40s linear infinite",
      },

      keyframes: {
        scrollUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        scrollDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      // animation: {
      //   scrollLeft: "scrollUp 20s linear infinite",
      //   scrollRight: "scrollRight 20s linear infinite",
      // },

      // keyframes: {
      //   scrollLeft: {
      //     "0%": { transform: "translateX(100%)" },
      //     "100%": { transform: "translateX(-100%)" },
      //   },
      //   scrollRight: {
      //     "0%": { transform: "translateX(-100%)" },
      //     "100%": { transform: "translateX(100%)" },
      //   },
      // },
    },
  },
  plugins: [],
};

export default config;

// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         black: ["Averta Black", "sans-serif"],
//         bold: ["Averta Bold", "sans-serif"],
//         extra_thin: ["Averta Extra Thin", "sans-serif"],
//         extrabold: ["Averta ExtraBold", "sans-serif"],
//         light: ["Averta Light", "sans-serif"],
//         regular: ["Averta Regular", "sans-serif"],
//         semibold: ["Averta SemiBold", "sans-serif"],
//         thin: ["Averta Thin", "sans-serif"],
//       },

//       fontSize: {
//         12: "12px",
//         14: "14px",
//         16: "16px",
//         18: "18px",
//         20: "20px",
//         24: "24px",
//         32: "32px",
//         42: "42px",
//         48: "48px",
//       },
//       textIndent: {
//         "50": "50px", // Customize this value as needed
//       },

//       screens: {
//         mobile: "10px",
//         tablet: "640px",
//         // => @media (min-width: 640px) { ... }

//         laptop: "1024px",
//         // => @media (min-width: 1024px) { ... }

//         desktop: "1280px",
//         // => @media (min-width: 1280px) { ... }
//       },

//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       colors: {
//         primary: "#2B7F75",
//         primary100: "#D7F8E8",
//         primary200: "#B2F2D8",
//         primary300: "#82D8BE",
//         primary400: "#59B29F",
//         primary500: "#2B7F75",
//         primary600: "#1F6D6B",
//         primary700: "#15565B",
//         primary800: "#0D4049",
//         primary900: "#082F3C",

//         secondary100: "#EDF1F3",
//         secondary200: "#DCE4E8",
//         secondary300: "#ACB5BB",
//         secondary400: "#6C7278",
//         secondary500: "#1A1C1E",
//         secondary600: "#131619",
//         secondary700: "#0D1015",
//         secondary800: "#080B11",
//         secondary900: "#04070E",

//         success100: "#F5FCD2",
//         success200: "#E8FAA6",
//         success300: "#D3F178",
//         success400: "#BCE455",
//         success500: "#9CD323",
//         success600: "#7FB519",
//         success700: "#659711",
//         success800: "#4C7A0B",
//         success900: "#3B6506",

//         mainGreen: "#00C73C",

//         error100: "#FCD7D4",
//         error200: "#FAABAD",
//         error300: "#F07E8D",
//         error400: "#E15C7A",
//         error500: "#CE2C60",
//         error600: "#B1205C",
//         error700: "#941657",
//         error800: "#770E4E",
//         error900: "#620849",

//         warning100: "#FFFAE1",
//         warning200: "#FFF3C3",
//         warning300: "#FFEBA6",
//         warning400: "#FFE390",
//         warning500: "#FFD66B",
//         warning600: "#DBB04E",
//         warning700: "#B78C35",
//         warning800: "#936A22",
//         warning900: "#7A5214",

//         information100: "#DCF3FF",
//         information200: "#BAE5FF",
//         information300: "#98D3FF",
//         information400: "#7EC2FF",
//         information500: "#54A6FF",
//         information600: "#3D81DB",
//         information700: "#2A60B7",
//         information800: "#1A4393",
//         information900: "#102E7A",

//         primaryLight: "#F1F6EE",
//         backgroundLight: "#F9FAFB",

//         progressView: "#F3F4F6",
//         divider: "#DCE4E8",
//         light: {
//           DEFAULT: "#FAFBFC",
//           lighter: "#F3F4F6",
//         },
//         text: {
//           primary: "#1C2634",
//           secondary: "#6C7278",
//         },
//         //
//         border: "#DCE4E8",
//         tableHead: "#F8FAFC",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         // primary: {
//         //   DEFAULT: 'hsl(var(--primary))',
//         //   foreground: 'hsl(var(--primary-foreground))'
//         // },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },

//       animation: {
//         scroll: "scroll 20s linear infinite",
//       },

//       keyframes: {
//         scroll: {
//           "0%": { transform: "translateX(0)" },
//           "100%": { transform: "translateX(-50%)" },
//         },
//       },
//     },
//   },
//   plugins: [
//     function ({ addComponents }: any) {
//       addComponents({
//         ".container": {
//           maxWidth: "100%",
//           "@screen sm": {
//             maxWidth: "576px",
//           },
//           "@screen md": {
//             maxWidth: "768px",
//           },
//           "@screen lg": {
//             maxWidth: "992px",
//           },
//           "@screen xl": {
//             maxWidth: "1200px",
//           },
//         },
//         ".table-container": {
//           maxWidth: "100%",
//           "@screen sm": {
//             maxWidth: "576px",
//           },
//           "@screen md": {
//             maxWidth: "768px",
//           },
//           "@screen lg": {
//             maxWidth: "992px",
//           },
//           "@screen xl": {
//             maxWidth: "1200px",
//           },
//           "@screen 2xl": {
//             maxWidth: "2400px",
//           },
//         },
//       });
//     },

//     function ({ addUtilities }: any) {
//       addUtilities({
//         ".text-indent-50": {
//           textIndent: "50px",
//         },
//       });
//     },

//     function ({ addComponents }: any) {
//       addComponents({
//         ".halfContainer": {
//           maxWidth: "100%",
//           "@screen sm": {
//             maxWidth: "288px",
//           },
//           "@screen md": {
//             maxWidth: "384px",
//           },
//           "@screen lg": {
//             maxWidth: "496px",
//           },
//           "@screen xl": {
//             maxWidth: "600px",
//           },
//         },
//       });
//     },
//   ],
// };
// export default config;
