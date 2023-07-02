import { locales } from '~/assets/js/locales';

export default defineNuxtPlugin(async nuxtApp => {

  const allTranslations = {}
  for (const locale of locales) {
    const file = await import(`../lang/${locale.code}.js`);
    const strings = {};
    for (const key in file.default.auth) {
      strings[key] = file.default.auth[key].source;
    }
    allTranslations[locale.code] = strings;
  };

  return {
    provide: {
      importAuthStringss: (locale) => {
        return allTranslations[locale];
      },
    }
  };
})