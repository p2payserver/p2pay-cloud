<script setup>
const {
  src,
} = defineProps({
  src: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-square">
        <NuxtImg :src="src" preset="preview" />
      </figure>
    </div>
  </div>
</template>

