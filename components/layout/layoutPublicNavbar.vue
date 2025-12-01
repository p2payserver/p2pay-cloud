<script setup>
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
        variant="primary"
        size="small"
        :to="localePath('/')"
        tag="router-link"
        inverted
        class="has-text-left"
      >
        <span class="has-text-weight-bold">&nbsp;P2Pay</span>
        <br>
        <span class="has-text-weight-bold">Cloud</span>
        <span>&nbsp;v0.1</span>
      </OButton>
    </div>
  </div>
  <div class="level-right">
    <div v-if="status === 'authenticated'" class="level-item">
      <OButton
        :to="localePath('/dashboard')"
        tag="router-link"
        variant="primary"
        inverted
      >{{ $t('menu.dashboard') }}</OButton>
      <OButton @click="logOut">{{ $t('auth.logoutEmail') }}</OButton>
    </div>
    <div v-else class="level-item">
      <OButton
        :to="localePath('/dashboard')"
        tag="router-link"
        variant="primary"
      >{{ $t('auth.loginEmail') }}</OButton>
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
</style>
