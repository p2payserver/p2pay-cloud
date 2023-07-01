import { locales } from '~/assets/js/locales';

export default defineNuxtPlugin(async nuxtApp => {

  const allTranslations = {}
  for (const locale of locales) {
    const file = await import (`../lang/${locale.code}.js`);
    const translation = {};
    for (const key in file.default.login) {
      translation[key] = file.default.login[key].source;
    }
    allTranslations[locale.code] = translation;
  };

  return {
    provide: {
      importStrings: (locale) => {
        return allTranslations[locale]
      },
    }
  };
})