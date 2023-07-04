<script setup>
useHead({
  title: 'Any Pay',
  meta: [
    {
      name: 'description',
      content: ``
    },
  ],
});

definePageMeta({
  auth: false
});

const { t } = useI18n();
</script>

<template>
  <NuxtLayout>
    <div>{{ t('welcome') }}</div>
    <NuxtLink :to="localePath('/dashboard')">Go to dashboard</NuxtLink>
  </NuxtLayout>
</template>