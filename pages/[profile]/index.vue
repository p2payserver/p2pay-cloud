<script setup>
  definePageMeta({
    auth: false
  });

  const { 
    params: { 
      profile
    }
  } = useRoute();

  const { locale } = useI18n();

  const content = await queryContent(`/profiles/${profile}/${locale.value}`).findOne();

  const { $md } = useNuxtApp();
</script>

<template>
  <NuxtLayout>
    <div class="content">
      <div v-html="$md().render(content.description)" />
    </div>
  </NuxtLayout>
</template>