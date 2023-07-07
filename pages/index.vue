<script setup>
const {
  locale: {
    value: locale
  },
  t
} = useI18n();

definePageMeta({
  auth: false
});

useHead({
  // title: 'AnyBtcPay',
  meta: [
    {
      id: 'description',
      name: 'description',
      content: t('seo.index')
    },
  ],
});

// redirect to locale only on the homepage
// because i18n settings do not work
const { fullPath } = useRoute();
if (fullPath === '/') navigateTo(`/${locale}`);
</script>

<template>
  <NuxtLayout>
    <div>{{ $t('seo.index') }}</div>
  </NuxtLayout>
</template>