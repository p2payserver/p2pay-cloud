<script setup>
import emojiData from '~/assets/js/emojiByGroup.js';
import find from 'lodash.find';
import filter from 'lodash.filter';

const search = ref(null);

const emojiFiltered = computed(() => {
  if (!search.value) return emojiData
  else {
    return emojiData
      .filter(group => {
        return find(group.emojis, o => o.name.toLowerCase().includes(search.value.toLowerCase()));
      })
      .map(group => {
        return {
          group: group.group,
          emojis: filter(group.emojis, o => o.name.toLowerCase().includes(search.value.toLowerCase()))
        };
      });
  }
});

const { $event } = useNuxtApp();

const emitAddEmoji = (emoji) => {
  
  $event('addEmoji', emoji);
}
</script>

<template>
  <div class="box">
    <section class="section">
      <OInput
        v-model="search"
        :placeholder="$t('emoji.searchEmojisInEnglish')"
      ></OInput>
    </section>
    <div v-for="(category, index) in emojiFiltered" :key="index" class="section">
      <div class="title is-6">{{ $t(`emoji.${category.group}`) }}</div>
      <div class="columns is-mobile is-multiline">
        <div v-for="(emoji, i) in category.emojis" :key="index + i" class="column is-mobile is-narrow" @click.native="emitAddEmoji(emoji.emoji)">
          {{ emoji.emoji }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  border-radius: 0px !important;
}
</style>