<script setup>
definePageMeta({ auth: false });
</script>

<template>
  <NuxtLayout>
    <h1>This is the home page</h1>
    <NuxtLink to="/dashboard">Go to dashboard</NuxtLink>
  </NuxtLayout>
</template>