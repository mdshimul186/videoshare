/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jsdoc/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "jsdoc"],
	rules: {
		"prefer-destructuring": [
			"error",
			{
				array: true,
				object: true,
			},
			{
				enforceForRenamedProperties: false,
			},
		],
	},
	settings: {
		react: {
			version: "16.13.1",
		},
		jsdoc: {
			tagNamePreference: {
				param: "param",
				returns: "return",
			},
		},
	},
};
