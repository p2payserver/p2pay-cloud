<script setup>
definePageMeta({ auth: false });

const {
    locale: {
      value: locale
    },
    t
  } = useI18n();
</script>

<template>
  <NuxtLayout>
    <div>{{ t('welcome') }} - {{ locale }}</div>
    <h1>This is the home page</h1>
    <NuxtLink :to="localePath('/dashboard')">Go to dashboard</NuxtLink>
  </NuxtLayout>
</template>