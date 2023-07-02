import { locales } from '~/assets/js/locales';

export default defineNuxtPlugin(async nuxtApp => {

  const allTranslations = {}
  for (const locale of locales) {
    const file = await import (`../lang/${locale.code}.js`);
    const translation = {};
    for (const key in file.default.auth) {
      translation[key] = file.default.auth[key].source;
    }
    allTranslations[locale.code] = translation;
  };

  return {
    provide: {
      importAuthStrings: (locale) => {
        return allTranslations[locale]
      },
    }
  };
})