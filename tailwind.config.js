// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Adjust paths according to your project structure
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily : {
        sans: ['Poppins', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
        PoppinsBold: ['Poppins-Bold', 'sans-serif'],
        PoppinsMedium: ['Poppins-Medium', 'sans-serif'],
        PoppinsRegular: ['Poppins-Regular', 'sans-serif'],
        PoppinsSemiBold: ['Poppins-SemiBold', 'sans-serif'],
        PoppinsThin: ['Poppins-Thin', 'sans-serif'],
        PoppinsExtraBold: ['Poppins-ExtraBold', 'sans-serif'],
        PoppinsExtraLight: ['Poppins-ExtraLight', 'sans-serif'],
        PoppinsLight: ['Poppins-Light', 'sans-serif'],
        PoppinsBlack: ['Poppins-Black', 'sans-serif'],
      },
      colors: {
        primary: {
          100: "#EDE7FF", // Very light shade, for backgrounds or highlights
          200: "#C8BFFF", // Light shade, for hover effects
          300: "#A493FF", // Medium-light shade, for secondary buttons
          400: "#6200EE", // Original color, for primary buttons and calls to action
          500: "#4F00BB", // Slightly darker shade, for active states or outlines
          600: "#3E0093", // Dark shade, for headings or stronger accents
          700: "#2E006C", // Even darker shade, for contrast
          800: "#220052", // Deep shade, for shadows or overlays
          900: "#160039", // Very dark shade, for text or deep accents
        },
        secondary: {
          100: "#F8F8F8",
          200: "#F1F1F1",
          300: "#D9D9D9",
          400: "#C2C2C2",
          500: "#AAAAAA",
          600: "#999999",
          700: "#666666",
          800: "#4D4D4D",
          900: "#333333",
        },
        success: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
        },
        danger: {
          100: "#FFF5F5",
          200: "#FED7D7",
          300: "#FEB2B2",
          400: "#FC8181",
          500: "#F56565",
          600: "#E53E3E",
          700: "#C53030",
          800: "#9B2C2C",
          900: "#742A2A",
        },
        warning: {
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
        },
        general: {
          100: "#CED1DD",
          200: "#858585",
          300: "#EEEEEE",
          400: "#0CC25F",
          500: "#F6F8FA",
          600: "#E6F3FF",
          700: "#EBEBEB",
          800: "#ADADAD",
        },
      },
    },
  },
  plugins: [],
};