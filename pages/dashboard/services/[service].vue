<script setup>
  definePageMeta({
    layout: "dashboard"
  });

  let profile;
  try {
    const { bookingProfile } = await $fetch('/api/dashboard/fauna');
    profile = bookingProfile;
  } catch (error) {
    profile = null;
  };

  const { 
    params: { 
      service,
      language
    }
  } = useRoute();


</script>


<template>
  <NuxtLayout>
    <ServiceSettingsForm 
      v-if="profile"
      :language="language"
      :profile="profile"
      :service="service"
    />
  </NuxtLayout>
</template>