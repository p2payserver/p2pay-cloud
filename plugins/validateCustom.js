import { defineRule, configure } from "vee-validate";
import { localize } from '@vee-validate/i18n';
import { locales } from '../assets/js/locales';

export default defineNuxtPlugin(nuxtApp => {

  // Import the localized messages for all the custom rules and configure them
  // Make sure that the rule name is the same as the localization key imported
  // Once the naming rule is respected, this code doesn't need to be changed if new rules are added
  // https://vitejs.dev/guide/features.html#glob-import
  const modules = import.meta.glob('../lang/*.js',  {
    import: 'default',
    eager: true
  });

  // build the localization object
  // Load all the properties in the customRules object except the ones starting with _
  const localizeMessages = locales.reduce((obj, locale) => {

    const customRulesJson = modules[`../lang/${locale.code}.js`].customRules;
    const customRulesProps = Object.keys(customRulesJson);

    const messages = customRulesProps.reduce((obj, prop) => {
      if (!prop.startsWith('_')) obj[prop] = customRulesJson[prop].source
      return obj
    }, {});

    obj[locale.code] = {
      code: locale.validate,
      messages
    };

    return obj;
  }, {});

  // Define the custom rule for the required email at login (without native language localization)
  // We pass the locale from the callBackUrl passed as fake target
  defineRule('loginRequired', (value, [target]) => {
    if (!value) return localizeMessages[target].messages.loginRequired;
    return true;
  });

  // Define the custom rule for the valid email at login (without native language localization)
  // We pass the locale from the callBackUrl passed as fake target
  defineRule('loginEmail', (value, [target]) => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regex.test(value)) return localizeMessages[target].messages.loginEmail;
    return true;
  })

  
  // configure localized messages
  configure({
    generateMessage: localize(localizeMessages),
  })
});

