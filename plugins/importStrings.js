import { locales } from '~/assets/js/locales';

export default defineNuxtPlugin(async nuxtApp => {

  const loginTranslatedStrings = await import.meta.glob('../lang/login/*.json',  {
    import: 'default',
    as: 'raw',
    eager: true
  });

  const obj = {}
  for (const locale of locales) {
    obj[locale.code] = JSON.parse(loginTranslatedStrings[`../lang/login/${locale.code}.json`])
  };

  return {
    provide: {
      importStrings: (locale) => {
        return obj[locale]
      },
    }
  };
})