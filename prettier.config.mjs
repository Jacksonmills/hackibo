/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
