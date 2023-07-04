import { locales } from '~/assets/js/locales';

// build the localization object
// Load all the properties in the auth object
// that is retrived with the $importAuthStrings plugin function
export default defineNuxtPlugin(async nuxtApp => {

  const files = import.meta.glob('../lang/*.js',  {
    import: 'default',
    eager: true
  });

  const localizedStringsObject = locales.reduce((translationsObject, locale) => {

    const authJson = files[`../lang/${locale.code}.js`].auth;
    const authProps = Object.keys(authJson);

    const messages = authProps.reduce((stringsObject, prop) => {
      stringsObject[prop] = authJson[prop]({
        normalize: (arr) => arr.map((_e, i) => arr[i]).join(''),
        interpolate: (str) => `{${str}}`,
        named: (str) => str
      });
      return stringsObject;
    }, {})

    translationsObject[locale.code] = messages;
    return translationsObject;
  }, {});

  return {
    provide: {
      importAuthStrings: (locale) => {
        return localizedStringsObject[locale];
      },
    }
  };
})