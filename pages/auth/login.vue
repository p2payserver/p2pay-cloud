<script setup>
import find from 'lodash.find';
import { locales, defaultLocale } from '~/assets/js/locales'

const { query } = useRoute();

const locale = (query && query.callbackUrl && find(locales, { code: query.callbackUrl.split('/')[3] })) ? query.callbackUrl.split('/')[3] : defaultLocale;

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
    loginEmailRequired: locale,
    loginEmailValid: locale
  }
}

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const signInHandler = async () => {

  try {
    
    const { error, url } = await signIn(undefined, {
    email: form.value.loginEmail,
    callbackUrl: 'http://localhost:3000/es/dashboard' // (callbackUrl) ? `${deploymentDomain}/${locale}/dashboard` : `${deploymentDomain}/dashboard`
  });

  if (error) {

    alert(error);

  } else {

    alert(url);
    return navigateTo(`/${locale}/verify`)
  }
  } catch (error) {
    alert(error)
  }
};

const { $importAuthStringss } = useNuxtApp();
const { loginEmail, magicLink, magicLinkInstructions } = $importAuthStringss(locale);
</script>

<template>
  <NuxtLayout>
    <div class="">
    <VForm
      name="login"
      :validation-schema="validationSchema"
      @submit="signInHandler"
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
            placeholder="satoshin@gmx.com"
            expanded
          />
        </OField>
      </VField>

      <OField>
        <OButton
          native-type="submit"
          expanded
        >{{ magicLink }}</OButton>
      </OField>
      </VForm>
      <section class="section">
        <div class="has-new-line">{{  magicLinkInstructions }}</div>
      </section>

    <!-- <pre>{{ providers }}</pre> -->
  </div>
  </NuxtLayout>
</template>
