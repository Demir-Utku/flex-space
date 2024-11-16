/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  arrowParens: 'avoid',
  printWidth: 120,
  semi: false,
  bracketSameLine: false,
  singleQuote: true,
  trailingComma: 'none',
  quoteProps: 'consistent',
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-tailwindcss']
}

export default config
