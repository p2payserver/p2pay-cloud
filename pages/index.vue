<script setup>
useHead({
  title: 'Any Btcpay',
  meta: [
    {
      name: 'description',
      content: `From shitcoins to Btcpay`
    },
  ],
});

definePageMeta({
  auth: false
});

const {
  locale: {
    value: locale
  }
} = useI18n();

const { fullPath } = useRoute();
if (fullPath === '/') navigateTo(`/${locale}`);
</script>

<template>
  <NuxtLayout>
    <div>{{ $t('welcome') }}</div>
  </NuxtLayout>
</template>