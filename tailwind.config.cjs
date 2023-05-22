/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      margin: {
        "2em": "0em 0 2em",
        "0.5em": "0.5em 0",
      },
    },
  },
  plugins: [],
};
