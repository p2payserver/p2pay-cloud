<script setup>
  const { $md } = useNuxtApp();

  const {
    profile,
    service,
    title,
    description,
    image,
    extras,
    body,
    gallery
  } = defineProps({
    profile: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    extras: {
      type: Array,
    },
    body: {
      type: String,
    },
    gallery: {
      type: Array,
      default: []
    }
  })
</script>

<template>
  <div>
    <section class="section">
      <div class="columns">
        <div v-if="image" class="column is-narrow">
          <div class="level-item is-justify-content-center">
            <figure class="image is-128x128">
              <NuxtImg
                class="is-rounded"
                preset="avatar"
                :src="'/gallery/' + profile + '/' + service + '/' + image"
                :alt="title"
                height="192"
                width="192"
              />
            </figure>
          </div>
        </div>
        <div class="column">
          <h1 v-if="title" class="title is-4 has-text-primary">{{ title }}</h1>
          <div v-if="description" class="subtitle is-6">{{ description }}</div>
          <div v-if="extras" class="columns is-multiline">
            <div v-for="{ title } in extras" :key="title" class="column is-narrow" >
              <IconWithText
                icon="plus"
                iconSide="left"
                :text="title"
                :textTo="'#'+title.replaceAll(' ', '-').toLowerCase()"
                textVariant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="body || (extras && extras.length)" class="section content">
      <div 
        v-if="body"
        v-html="$md().render(body.replaceAll('\n', '  \n'))" 
        class="block"
      />
      <div
        v-if="extras && extras.length"
        v-for="{ title, description } in extras"
        :key="title"
        class="block"
      >
        <div
          :id="title.replaceAll(' ', '-').toLowerCase()"
          v-if="description"
          class="block"
        >
          <span class="has-text-weight-bold">{{ title }}</span>
          <span class="is-italic">&nbsp;[Extra]</span>
        </div>
        <span>{{ description }}</span>
      </div>´
    </section>
    <Gallery
      :path="'/' + profile + '/' + service"
      :gallery="gallery"
    />
  </div>
</template>

