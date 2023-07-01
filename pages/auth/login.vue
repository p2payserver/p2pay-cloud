<script setup>

const {
  locale: {
    value: defaultLocale
  }
} = useI18n();

const { query } = useRoute();
const locale = (query.callbackUrl) ? query.callbackUrl.split('/')[3] : defaultLocale;

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (query) => (query && query.callbackUrl) ? `${locale}/dashboard` : '/dashboard',
  }
});

const { signIn , getProviders } = useAuth();

const providers = await getProviders();

const email = ref(null);

const mySignInHandler = async () => {
  const { error, url } = await signIn('magic-link', { email: email.value, callbackUrl: `/dashboard`, redirect: false })
  if (error) {
    // Do your custom error handling here
    alert(error)
  } else {
    alert(url)
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: true })
  }
};

const { $importStrings } = useNuxtApp();
const loginStrings = $importStrings(locale);
const { magicLink } = loginStrings;
</script>

<template>
  <div>
    <input v-model="email" />
    <button @click.prevent="signIn(undefined, { email, callbackUrl: `/${locale}/dashboard` })">{{ magicLink }}</button>
    <div>{{ providers }}</div>
  </div>
</template>

