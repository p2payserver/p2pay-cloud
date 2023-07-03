<script setup>
import dashboard from '~/assets/json/dashboard.json';

const { signOut } = useAuth();

const logOut = async () => {
  await signOut();
};
</script>

<template>
  <section class="section">
    <OMenu>
      <OMenuList :label="$t('menu.dashboard')">
        <OMenuItem v-for="main in Object.keys(dashboard)" :key="main" expanded>
          <template  #label="props">{{ $t(main) }}</template>
          <OMenuItem
            v-for="item in  Object.keys(dashboard[main])"
            :key="item"
            :label="$t(item)"
            tag="router-link"
            :to="localePath(dashboard[main][item])"
          />
        </OMenuItem>
      </OMenuList>
    </OMenu>
    <OMenu>
      <OButton @click="logOut">{{ $t('logout') }}</OButton>
    </OMenu>
  </section>
</template>