module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: true,
		commonjs: true,
		node: true,
		es6: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended",
	],
	plugins: [
		"simple-import-sort",
		"prettier",
		"react-hooks",
		"@typescript-eslint",
	],
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		"@typescript-eslint/no-unused-vars": ["error"],
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
	},
};
