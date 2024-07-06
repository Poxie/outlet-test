import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#fff',
        secondary: '#F2F2F2',
        tertiary: '#E7E7E7',
        quaternary: '#DBDBDB',
        'c-primary': '#E73128',
        'c-primary-accent': '#C92E26',
      },
      textColor: {
        primary: '#0f172a',
        muted: '#475569',
        light: '#fff',
        'c-primary': '#E73128',
      },
      borderColor: {
        primary: '#fff',
        secondary: '#F2F2F2',
        tertiary: '#E7E7E7',
        quaternary: '#DBDBDB',
        'text-primary': '#0f172a',
      },
      fill: {
        light: '#fff',
        't-primary': '#0f172a',
        'c-primary': '#E73128',
      },
      stroke: {
        'c-primary': '#E73128',
      },
      width: {
        main: '1100px',
      },
      maxWidth: {
        main: '90%',
      },
      padding: {
        section: '4rem 0',
      },
    },
  },
  plugins: [],
};
export default config;
