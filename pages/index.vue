<script setup>
useHead({
  title: 'AnyBtcPay',
  meta: [
    {
      name: 'description',
      content: `Accept shitcoins (crypto and fiat) on Btcpay Server`
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

// redirect to locale only on the homepage
// because i18n settings do not work
const { fullPath } = useRoute();
if (fullPath === '/') navigateTo(`/${locale}`);
</script>

<template>
  <NuxtLayout>
    <div>{{ $t('welcome') }}</div>
  </NuxtLayout>
</template>