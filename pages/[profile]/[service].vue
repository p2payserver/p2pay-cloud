<script setup>
  definePageMeta({
    auth: false
  });

  const { 
    params: { 
      profile,
      service 
    }
  } = useRoute();

  const { locale } = useI18n();

  const content = await queryContent(`/services/${profile}/${service}`).locale(locale.value).findOne();

  const { $md } = useNuxtApp();
</script>


<template>
<NuxtLayout>
  <div class="content">
    <div v-html="$md().render(content.description)" />
  </div>
</NuxtLayout>
</template>