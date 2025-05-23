/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "border-default-default": "#d9d9d9",
        "background-default-default": "#fff",
        "text-default-secondary": "#757575",
        "text-default-default": "#1e1e1e",
        "background-brand-tertiary": "#f5f5f5",
        "background-brand-default": "#2c2c2c",
        "m3-sys-light-on-surface": "#1d1b20",
        "background-brand-secondary": "#e6e6e6",
        "black-200": "#0c0c0d",
        "colors-brown": "#a2845e",
        "m3-sys-light-primary": "#65558f",
        darkslategray: "#454545",
        black: "#000",
        gray: {
          "100": "#828282",
          "200": "rgba(255, 255, 255, 0)",
        },
        tan: {
          "100": "#cbb28b",
          "200": "rgba(203, 178, 139, 0.49)",
        },
      },
      spacing: {
        "spacing-s": "24px",
        "spacing-xs": "8px",
        "space-1200": "48px",
        "space-600": "24px",
        "space-400": "16px",
        "space-200": "8px",
        "space-800": "32px",
        "space-1600": "64px",
        "space-300": "12px",
        "space-100": "4px",
        "padding-lg": "16px",
        "padding-sm": "8px",
        "spacing-sm": "32px",
        "spacing-m": "48px",
      },
      fontFamily: {
        subheading: "Inter",
        "m3-label-large": "Roboto",
      },
      borderRadius: {
        "radius-200": "8px",
        "radius-100": "4px",
        "radius-full": "9999px",
        "radius-md": "8px",
        "8xs": "5px",
        "9980xl": "9999px",
        "81xl": "100px",
      },
      borderWidth: {
        "stroke-border": "1px",
      },
      padding: {
        "12xs": "1px",
        "60xl": "79px",
        "52xl": "71px",
        "16xl": "35px",
        "20xl": "39px",
        "3xs": "10px",
        xl: "20px",
        "4xs": "9px",
        "28xl": "47px",
        "lg-4": "18.4px",
        "35xl": "54px",
        "12xs-4": "0.4px",
        "13xl": "32px",
        sm: "14px",
        mini: "15px",
        "6xs": "7px",
        "6xl": "25px",
        "66xl": "85px",
        "23xl": "42px",
        "61xl": "80px",
        "21xl": "40px",
        "139xl": "158px",
        "48xl": "67px",
        "84xl": "103px",
        "7xl": "26px",
        "269xl": "288px",
        "89xl": "108px",
        "64xl": "83px",
        "100xl": "119px",
        "337xl": "356px",
      },
    },
    fontWeight: {
      "body-font-weight-regular": "400",
      "body-font-weight-strong": "600",
    },
    fontSize: {
      "body-size-small": "14px",
      "body-size-medium": "16px",
      "subheading-size-medium": "20px",
      "label-large-size": "14px",
      "5xl": "24px",
      base: "16px",
      sm: "14px",
      "45xl": "64px",
      xl: "20px",
      "29xl": "48px",
      lgi: "19px",
      inherit: "inherit",
    },
    screens: {
      sm: "640px", 
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    }    
  },
  corePlugins: {
    preflight: false,
  }
};
