import find from 'lodash.find';

export const locales = [
  {
    code: 'en',
    file: 'en.json',
    iso: 'en-US',
    name: 'English',
    validate: 'en',
    default: true
  }, 
  {
    code: 'es',
    file: 'es.json',
    iso: 'es-419',
    name: 'Español',
    validate: 'es',  
  },
  {
    code: 'it',
    file: 'it.json',
    iso: 'it-IT',
    name: 'Italiano',
    validate: 'it',
  }
];

export const localeCodes = locales.map(locale => locale.code);

export const defaultLocale = find(locales, { default: true }).code;

export const excludedRoutes = localeCodes.reduce((arr, code) => {
  ['auth', 'dashboard'].map(endpoint => {
    arr.push(`/${code}/${endpoint}/**`);
  });
  return arr;
}, []).concat(['admin']);

