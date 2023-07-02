import { defineNuxtPlugin } from '#app';
import {
  OField,
  OInput,
  OButton,
  // Config,
} from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';

// const myConfig = Object.assign(bulmaConfig, {
//   notification: {
//       ...bulmaConfig.notification,
//       position: 'bottom-right'
//   }
// })

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('OField', OField);
  nuxtApp.vueApp.component('OInput', OInput);
  nuxtApp.vueApp.component('OButton', OButton);
  // nuxtApp.vueApp.use(Config, myConfig);
});
