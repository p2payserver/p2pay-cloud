<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: 'auth'
});
</script>

<template>
  <NuxtLayout>
    <section class="section is-medium">
      <div class="title">{{ $t('dashboard.shop.paid')}}</div>
    </section>
  </NuxtLayout>
</template>
