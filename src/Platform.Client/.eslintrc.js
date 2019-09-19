module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
	"extends": ["prettier", "prettier/react"],
	"react/jsx-filename-extension": "off",
	"import/prefer-default-export": "off",
	"linebreak-style": "off",
	"class-methods-use-this": "off",
	"no-param-reassign": "off",
	"no-underscore-dangle": "off",
	"jsx-a11y/anchor-is-valid": "off",
	"jsx-a11y/click-events-have-key-events": "off",
	"jsx-a11y/no-static-element-interactions": "off",
	"jsx-a11y/no-noninteractive-element-interactions": "off",
	"jsx-a11y/label-has-for": "off",
	"no-case-declarations": "off",
	"react/jsx-one-expression-per-line": "off",
	"react/no-array-index-key": "off",
	"radix": "off"
  },
  parser: "babel-eslint",
};
