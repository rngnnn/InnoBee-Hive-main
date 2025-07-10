/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "half-transparent": "rgba(0, 0, 0, 0.1)",
        "h-transparent": "rgba(0, 0, 0, 0.5)",
        "pri-color": "#FFB000",
        "sec-color": "#ff8c00",
        brown: "#2d2d2d",
      },
      colors: {
        "pri-color": "#FFB000",
        "sec-color": "#ff8c00",
        yellow: {
          light: "#F9DB29",
          dark: "#FFB000",
        },
        gray: {
          light: "#FAFAFA",
          default: "#F0F0F0",
          dark: "#BFBFBF",
          darker: "#7F7F7F",
        },
        red: {
          light: "#ED1A3B",
          dark: "#CE1030",
        },
        green: {
          light: "#5EED5E",
          dark: "#00CC8D",
        },
        blue: {
          light: "#476788",
        },
        disabled: "#fcbc9c",
        brown: "#2d2d2d",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      boxShadow: {
        popupYellow: "rgba(255, 176, 0, 0.26) 0px 0px 7px 7px",
        brown: "0 1px 2px 0 rgba(45, 45, 45, 0.5)",
        "md-brown":
          "0 4px 6px -1px rgba(45, 45, 45, 0.3), 0 2px 4px -2px rgba(45, 45, 45, 0.2)",
        "yellow-focus": "0 0 0 3px rgba(255, 176, 0, 0.5)",
        subtle:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        yellowRadial:
          "radial-gradient(circle at 20% 50%, #F9DB29, #FFB000 80%)",
        linearGradientToBottom: "linear-gradient(to bottom, #F9DB29, #FFB000)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      zIndex: {
        100: "100",
        200: "200",
        300: "300",
        max: "999", // for sidebars and important parts!
        1000: "1000", // for popups that should go above everything else, including the sidebars.
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
