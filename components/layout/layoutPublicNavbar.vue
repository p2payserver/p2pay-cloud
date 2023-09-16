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
        variant="success"
        size="small"
        inverted
        disabled
      >
        <span class="has-text-weight-bold">Booking</span>
        <span>&nbsp;v0.1</span>
        <br>
        <span>@</span>
        <span class="has-text-weight-bold">&nbsp;AnyBTCPay</span>
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
