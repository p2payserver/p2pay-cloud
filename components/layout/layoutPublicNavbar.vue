<script setup>
const { status } = useAuth();
</script>

<template>
<nav class="level is-mobile">
  <div class="level-left">
    <div class="level-item">
      <OButton
        class="disabled"
        variant="primary"
        outlined
      >
        <span class="has-text-weight-bold">AnyBtcPay</span>
        <span>&nbsp;</span>
        <span>v0.3</span>
      </OButton>
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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.disabled{
  pointer-events: none;
}
</style>