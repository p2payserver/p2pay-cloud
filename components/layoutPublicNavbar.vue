<script setup>
const { status } = useAuth();
</script>

<template>
<nav class="level">
  <div class="level-left">
    <div class="level-item">
      <div class="tags has-addons">
        <span class="tag is-primary is-medium">Any Btcpay</span>
        <span class="tag is-light is-medium">0.1.0</span>
      </div>
    </div>
  </div>
  <div class="level-right">
    <div class="level-item">
      <OButton
        :to="localePath('/dashboard')"
        tag="router-link"
        variant="primary"
      >{{ (status === 'authenticated') ? $t('menu.dashboard') : $t('login') }}</OButton>
    </div>
  </div>
</nav>
</template>

<style scoped>
  /* Same vertical padding as navbar
  https://bulma.io/documentation/components/navbar/#variables */
.level {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>