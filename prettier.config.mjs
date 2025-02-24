/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  bracketSameLine: true,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react",  // React imports first
    "^next",   // Next.js imports second
    "^@components/*", // Alias for components
    "^@utils/*", // Alias for utils
    "^@lib/*", // Alias for libraries
    "^@store/*", // Alias for store
    "^@types/*", // Alias for types
    "^[a-zA-Z]", // External libraries
    "^[./]" // Relative imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
