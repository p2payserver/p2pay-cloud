<script setup>
  definePageMeta({
    layout: 'public',
    auth: false
  });

  const { 
    params: {
      profile,
      service 
    }
  } = useRoute();

  const { locale } = useI18n();

  const  {
    title,
    disabled,
    description,
    image,
    extras,
    body,
    gallery
  } = await queryContent(`/services/${profile}/${service}/${locale.value}`).findOne();

  if (!title && !body) throw createError({ statusCode: 404 })

  const isLoading = ref(false);

  const { 
    public: {
      deploymentDomain
    }
  } = useRuntimeConfig();

  useHead({
    meta: [
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
      {
        id: 'og:image',
        name: 'og:image',
        content: `${deploymentDomain}/${image}`
      },  
      {
        id: 'twitter:image',
        name: 'twitter:image',
        content: `${deploymentDomain}/${image}`
      }, 
    ]
  })

  useContentHead({
    title, 
    description
  });
</script>

<template>
  <NuxtLayout>
    <OLoading
      :full-page="true"
      v-model:active="isLoading"
      :can-cancel="false"
    >
      <OIcon
        pack="mdi"
        icon="loading"
        size="large"
        spin
      />
    </OLoading>
    <section class="section is-medium">
      <nav class="breadcrumb">
      <ul>
        <li>
          <NuxtLink :to="localePath('/')">{{ profile }}</NuxtLink>
        </li>
        <li class="is-active">
          <NuxtLink :to="localePath(`/${profile}/${service}`)">{{ title }}</NuxtLink>
        </li>
      </ul>
    </nav>
    </section>
    <div class="columns">
      <div class="column">
        <ServiceProfile
          :profile="profile"
          :service="service"
          :title="title"
          :description="description"
          :image="image"
          :extras="extras"
          :body="body"
          :gallery="gallery"
        />
      </div>
      <div class="column is-narrow">
        <section class="section">
          <div id="side"></div>
          <!-- <ServiceBookingForm
            :service="service"
            :disabled="disabled"
            id="side"
          /> -->
        </section>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
  @media screen and (min-width: 768px) {
    #side {
    width: 366px;
  }
}
</style>