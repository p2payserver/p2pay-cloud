<script setup>
const { fullPath } = useRoute();

const { status, signOut } = useAuth();

const {
  locale: {
    value: locale
  }
} = useI18n();

const logOut = async () => {
  await signOut({
    callbackUrl: `/${locale}`
  });
};
</script>

<template>
<nav class="level is-mobile">
  <div class="level-left">
    <div class="level-item">
      <OButton
        class="disabled"
        variant="success"
        inverted
      >
        <span class="has-text-weight-bold">AnyBTCPay</span>
        <span>&nbsp;</span>
        <span>0.1</span>
      </OButton>
    </div>
  </div>
  <div v-if="!fullPath.startsWith('/auth/')" class="level-right">
    <div v-if="status === 'authenticated'" class="level-item">
      <OButton
        :to="localePath('/dashboard')"
        tag="router-link"
        variant="primary"
        inverted
      >{{ $t('menu.dashboard') }}</OButton>
      <OButton @click="logOut">{{ $t('logout') }}</OButton>
    </div>
    <div v-else class="level-item">
      <OButton
        :to="localePath('/dashboard')"
        tag="router-link"
        variant="primary"
      >{{ $t('login') }}</OButton>
    </div>
  </div>
</nav>
</template>

<style scoped>
  /* Vertical padding to match the navbar */
.level {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.disabled{
  pointer-events: none;
}
</style>