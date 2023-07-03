<script setup>
definePageMeta({
  layout: "dashboard",
  // middleware: 'auth'
});
</script>

<template>
  <NuxtLayout>
    <section class="section is-medium">
      <div class="title">{{ $t('menu.dashboard')}}</div>
    </section>
  </NuxtLayout>
</template>