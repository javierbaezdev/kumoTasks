module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "./node_modules/ts-standard/eslintrc.json",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-base-to-string": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "array-callback-return": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
  },
};
