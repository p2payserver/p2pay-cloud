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
    <div class="hero is-fullheight">
      <div class="hero-body is-justify-content-center">
        <div class="has-text-centered">
          <p class="title">{{ $t('seo.index').split('.')[0] }}</p>
          <p class="subtitle">{{ $t('seo.index').split('.').slice(1).join('.') }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>