<script setup>

const {
  locale: {
    value: defaultLocale
  }
} = useI18n();

const { query } = useRoute();
const locale = (query.callbackUrl) ? query.callbackUrl.split('/')[3] : defaultLocale;

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (query) => (query && query.callbackUrl) ? `${locale}/dashboard` : '/dashboard',
  }
});

const { $importStrings } = useNuxtApp();
const loginStrings = $importStrings(locale);
const { emailSent } = loginStrings;
</script>

<template>
  <div>{{ emailSent }}</div>
</template>