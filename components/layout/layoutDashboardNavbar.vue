<script setup>
import dashboard from '~/assets/json/dashboard.json';

const { signOut } = useAuth();

const {
  locale
} = useI18n();

const logOut = async () => {
  await signOut({
    callbackUrl: `/${locale.value}`
  });
};

onMounted(() => {

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <OButton
        variant="primary"
        size="small"
        :to="localePath('/')"
        tag="router-link"
        inverted
      >
        <span class="has-text-weight-bold">Booking</span>
        <span>&nbsp;v0.1</span>
        <br>
        <span>@</span>
        <span class="has-text-weight-bold">&nbsp;AnyBTCPay</span>
      </OButton>
    </div>
    <a role="button" class="navbar-burger" data-target="dashboardNavbar">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="dashboardNavbar" class="navbar-menu">
    <div class="navbar-start is-hidden-tablet">
      <div v-for="main in Object.keys(dashboard)" :key="main" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">{{ $t(main) }}</a>
        <div v-for="item in  Object.keys(dashboard[main])" key="item" class="navbar-dropdown">
          <NuxtLink :to="localePath(dashboard[main][item])" class="navbar-item">{{ $t(item) }}</NuxtLink>
        </div>
      </div>
      
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <!-- <OButton
          :to="localePath('/')"
          tag="router-link"
          variant="primary"
          inverted
        >{{ $t('homePage') }}</OButton> -->
        <OButton @click="logOut">{{ $t('auth.logoutEmail') }}</OButton>
      </div>
    </div>
  </div>
</nav>
</template>