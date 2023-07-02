<script setup>
import find from 'lodash.find';
import { locales, defaultLocale } from '~/assets/js/locales'

const { query } = useRoute();

const locale = (query && query.callbackUrl && find(locales, { code: query.callbackUrl.split('/')[3] })) ? query.callbackUrl.split('/')[3] : defaultLocale;

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `${locale}/dashboard`
  }
});

const { $importAuthStringss } = useNuxtApp();
const { emailSent, checkEmail } = $importAuthStringss(locale);
</script>

<template>
  <NuxtLayout>
    <p class="title">
      {{ emailSent }}
    </p>
    <p class="subtitle">
      {{ checkEmail }}
    </p>
  </NuxtLayout>
</template>