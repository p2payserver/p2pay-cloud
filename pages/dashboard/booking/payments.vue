<script setup>
definePageMeta({
  layout: "dashboard"
});
const { fullPath } = useRoute();
const pagePath = fullPath.split('/').slice(3).join('/>/').split('/');
</script>

<template>
  <NuxtLayout>
    <DashboardHeader :pagePath="pagePath" />
  </NuxtLayout>
</template>