<script setup>
import dashboard from '~/assets/json/dashboard.json';

const { signOut } = useAuth();

const logOut = async () => {
  await signOut()
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
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div v-for="el in Object.keys(dashboard)" :key="el" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">{{ el }}</a>
        <div v-for="item in  Object.keys(dashboard[el])" key="item" class="navbar-dropdown">
          <NuxtLink :to="localePath(dashboard[el][item])" class="navbar-item">{{ item }}</NuxtLink>
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