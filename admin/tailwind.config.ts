import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./modals/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#fff',
        secondary: '#F2F2F2',
        tertiary: '#E7E7E7',
        quaternary: '#C9C9C9',
        'c-primary': '#E73128',
        'c-primary-accent': '#C92E26',
        danger: '#FF0000',
        success: '#009900',
      },
      textColor: {
        primary: '#0f172a',
        muted: '#475569',
        light: '#fff',
        'c-primary': '#E73128',
        danger: '#FF0000',
        success: '#009900',
      },
      borderColor: {
        primary: '#fff',
        secondary: '#F2F2F2',
        tertiary: '#E7E7E7',
        quaternary: '#C9C9C9',
        'text-primary': '#0f172a',
        danger: '#FF0000',
        success: '#009900',
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
        sidebar: '300px',
        menu: '200px',
        dropdown: '220px',
        modal: '500px',
      },
      height: {
        'sidebar-header': '68px',
      },
      minWidth: {
        menu: '200px',
        dropdown: '220px',
        sidebar: '300px',
      },
      maxWidth: {
        main: '90%',
      },
      padding: {
        section: '4rem 0',
      },
      animation: {
        'feedback-progress': 'feedback-progress linear',
      },
      keyframes: {
        'feedback-progress': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
