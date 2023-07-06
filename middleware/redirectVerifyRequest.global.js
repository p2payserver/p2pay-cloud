import { locales } from '~/assets/js/locales';
import find from 'lodash.find';

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (from.path === '/auth/verify' && !find(locales, locale => locale.code === to.path.split('/')[1])) {

    const cookieLocale = useCookie('locale');
    
    return navigateTo(`/${cookieLocale.value}/auth/verify`);
  }
  return;
})