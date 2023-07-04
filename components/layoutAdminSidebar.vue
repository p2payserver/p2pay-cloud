<script setup>
import admin from '~/assets/json/admin.json';

const { signOut } = useAuth();

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
  <section class="section">
    <OMenu>
      <OMenuList :label="Admin">
        <OMenuItem v-for="main in Object.keys(dashboard)" :key="main" expanded>
          <template  #label="props">{{ main }}</template>
          <OMenuItem
            v-for="item in Object.keys(admin[main])"
            :key="item"
            :label="item"
            tag="router-link"
            :to="admin[main][item]"
          />
        </OMenuItem>
      </OMenuList>
    </OMenu>
    <OMenu>
      <OButton @click="logOut">{{ $t('logout') }}</OButton>
    </OMenu>
  </section>
</template>