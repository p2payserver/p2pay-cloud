<script setup>
import dashboard from '~/assets/json/dashboard.json';

const { signOut } = useAuth();

const logOut = async () => {
  await signOut()
};
</script>

<template>
  <section class="section">
    <OMenu>
      <OMenuList :label="$t('menu.dashboard')">
        <OMenuItem v-for="el in Object.keys(dashboard)" :key="el" expanded>
          <template  #label="props">{{ el }}</template>
          <OMenuItem v-for="item in  Object.keys(dashboard[el])" :key="item" :label="item" tag="router-link" :to="localePath(dashboard[el][item])"></OMenuItem>
        </OMenuItem>
      </OMenuList>
    </OMenu>
    <OMenu>
      <OButton @click="logOut">{{ $t('logout') }}</OButton>
    </OMenu>
  </section>
</template>