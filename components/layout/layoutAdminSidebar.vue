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
      <OMenuList label="Admin">
        <div
          v-for="main in Object.keys(admin)"
          :key="main"
        >
          <OMenuItem expanded>
            <template
              v-if="typeof admin[main] === 'object'"
              #label="props"
            >{{ main }}</template>
            <OMenuItem
              v-if="typeof admin[main] === 'object'"
              v-for="item in Object.keys(admin[main])"
              :key="item"
              :label="item"
              tag="router-link"
              :to="localePath(admin[main][item])"
            />
          </OMenuItem>
          <OMenuItem
            v-if="typeof admin[main] === 'string'"
            :label="main"
            tag="router-link"
            :to="localePath(admin[main])"
          />
        </div>
      </OMenuList>
    </OMenu>
    <OMenu>
      <OButton
        @click="logOut"
        variant="success"
        inverted
      >Sign out</OButton>
    </OMenu>
  </section>
</template>

<style scoped>
.section {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
</style>