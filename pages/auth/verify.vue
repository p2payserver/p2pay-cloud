<script setup>
definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `/${locale}/dashboard`
  }
});
</script>

<template>
  <NuxtLayout>
    <p class="title">{{ $t('auth.emailSent') }}</p>
    <p class="subtitle">{{ $t('auth.checkEmail') }}</p>
  </NuxtLayout>
</template>