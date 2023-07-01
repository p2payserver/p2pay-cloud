<script setup>
const {
  locale: {
    value: defaultLocale
  }
} = useI18n();

const { query } = useRoute();

const locale = (query && query.callbackUrl) ? query.callbackUrl.split('/')[3] : defaultLocale;

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `${locale}/dashboard`
  }
});

const { signIn , getProviders } = useAuth();

// const providers = await getProviders();

const form = ref({
  loginEmail: '',
});

const validationSchema = {
  loginEmail: {
    loginRequired: locale,
    loginEmail: locale
  }
}

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const mySignInHandler = async () => {

  const { error, url } = await signIn(undefined, {
    email: form.value.loginEmail,
    // callbackUrl: 'http://localhost:3000/es/dashboard' // (callbackUrl) ? `${deploymentDomain}/${locale}/dashboard` : `${deploymentDomain}/dashboard`
  });

  if (error) {

    alert(error);

  } else {

    alert(url);
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: true })
  }
};

const { $importStrings } = useNuxtApp();
const loginStrings = $importStrings(locale);
const { loginEmail, magicLink } = loginStrings;
</script>

<template>
  <NuxtLayout>
    <div class="">
    <VForm
      name="login"
      :validation-schema="validationSchema"
      @submit="mySignInHandler"
    >
      <VField
        name="loginEmail"
        :label="loginEmail"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.loginEmail"
      >
        <OField
          :label="loginEmail"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OInput
            :label="loginEmail"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
            expanded
          />
        </OField>
      </VField>

      <OField>
        <OButton
          native-type="submit"
        >{{ magicLink }}</OButton>
      </OField>
      </VForm>

    <!-- <pre>{{ providers }}</pre> -->
  </div>
  </NuxtLayout>
</template>

