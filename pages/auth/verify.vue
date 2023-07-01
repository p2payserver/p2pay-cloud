<script setup>
const {
  locale: {
    value: defaultLocale
  }
} = useI18n();

const { query: { callbackUrl }} = useRoute();

const locale = (callbackUrl) ? callbackUrl.split('/')[3] : defaultLocale;

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (callbackUrl) => (callbackUrl) ? `${locale}/dashboard` : '/dashboard',
  }
});

const { $importStrings } = useNuxtApp();
const loginStrings = $importStrings(locale);
const { emailSent, checkEmail } = loginStrings;
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