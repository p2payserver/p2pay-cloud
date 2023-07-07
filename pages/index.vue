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

const title = t('seo.index').split('.')[0]
const description = t('seo.index').split('.').slice(1).join('.')

useHead({
  title,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: description
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
          <p class="title">{{ title }}</p>
          <p class="subtitle">{{ description }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>