<script setup>
const {
  pagePath
} = defineProps({
  pagePath: {
    type: Array,
    required: true
  }
});
</script>

<template>
<nav>
  <ul>
    <li>
      <span
        v-for="segment in pagePath"
        :key="segment"
        class="title"
      >{{ (segment === '>') ? ` ${segment} ` : $t(`menu.${segment}`) }}</span>
    </li>
  </ul>
</nav>
</template>