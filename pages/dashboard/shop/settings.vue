<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: 'auth'
});
</script>

<template>
  <NuxtLayout>
    <section class="section is-medium">
      <div class="title">{{ $t('dashboard.shop.settings')}}</div>
    </section>
  </NuxtLayout>
</template>