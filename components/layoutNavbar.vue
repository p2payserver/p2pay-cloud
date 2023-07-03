<script setup>
import dashboard from '~/assets/json/dashboard.json';

const { signOut } = useAuth();

const logOut = async () => {
  await signOut();
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
    <div class="title">{{ $t('menu.dashboard') }}</div>
    <a role="button" class="navbar-burger" data-target="dashboardNavbar">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="dashboardNavbar" class="navbar-menu">
    <div class="navbar-start">
      <div v-for="main in Object.keys(dashboard)" :key="main" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">{{ $t(main) }}</a>
        <div v-for="item in  Object.keys(dashboard[main])" key="item" class="navbar-dropdown">
          <NuxtLink :to="localePath(dashboard[main][item])" class="navbar-item">{{ $t(item) }}</NuxtLink>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <OButton @click="logOut">{{ $t('logout') }}</OButton>
      </div>
    </div>
  </div>
</nav>
</template>