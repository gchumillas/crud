// Gets the 'short' part of a "locale code".
//
// For example:
//   getShortLang('en-US') // returns 'en'
//   getShortLang('es')    // returns 'es'
//
export const getShortLang = (lang: string) => {
  const matches = lang.match(/^\w+/)

  return matches ? matches[0] : ''
}