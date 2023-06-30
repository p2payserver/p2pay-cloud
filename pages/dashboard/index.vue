<script setup>
definePageMeta({
  layout: "dashboard",
});

const email = ref(null)

const getEmail = async () => {
  const user = await $fetch('/api/dashboard/user', {
    credentials: 'include'
  })
  email.value = user.email
  return user
}
</script>

<template>
  <NuxtLayout>
    <div><h1>This is the dashboard page</h1></div>
    <div><button @click="getEmail">Get user</button></div>
    <div><NuxtLink to="/">Go to home</NuxtLink></div>
    <div>{{ email }}</div>
  </NuxtLayout>
</template>