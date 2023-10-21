// .eslintrc.js

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended", // Base ESLint configuration
    "plugin:@typescript-eslint/recommended", // TypeScript-specific recommended rules
  ],
  rules: {},
  parserOptions: {
    ecmaVersion: 2018, // Set to 2018 (ES9) or a suitable version for your project
    sourceType: "module", // Specifies the source type (e.g., 'module' for ES6 modules)
    project: "./tsconfig.json", // Path to your TypeScript project configuration file
  },
};
