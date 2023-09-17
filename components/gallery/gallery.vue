<script setup>
const {
  path,
  gallery
} = defineProps({
  path: {
    type: String
  },
  gallery: {
    type: Array,
    default: []
  }
})
</script>

<template>
    <section v-if="gallery && gallery.length" class="section">
      <galleryPreview 
        :path="path"
        :gallery="gallery" 
      />
      <galleryModal />
    </section>
</template>
