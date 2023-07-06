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

const { t } = useI18n();
</script>

<template>
  <NuxtLayout>
    <div>{{ t('welcome') }}</div>
  </NuxtLayout>
</template>