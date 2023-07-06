<script setup>
import find from 'lodash.find';
import { locales, defaultLocale } from '~/assets/js/locales'

definePageMeta({
  i18n: false,
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `/${locale}/dashboard`
  }
});

const { query } = useRoute();

const locale = (
  query
  && query.callbackUrl
  && find(locales, { code: query.callbackUrl.split('/')[3] })
)
  ? query.callbackUrl.split('/')[3]
  : defaultLocale;

const { signIn } = useAuth();

const form = ref({
  loginEmail: '',
});

const validationSchema = {
  loginEmail: {
    loginEmailRequired: locale,
    loginEmailValid: locale
  }
};

const signInHandler = async () => {
  try {

    const cookieLocale = useCookie('locale', { maxAge: 60 });
    cookieLocale.value = locale;

    await signIn('magic-link', {
      email: form.value.loginEmail,
      callbackUrl: `/${locale}/dashboard`,
    });
  } catch (error) {
    throw createError(error);
  }
};

const { $importAuthStrings } = useNuxtApp();
const { loginEmail, magicLink, magicLinkInstructions } = $importAuthStrings(locale);
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
  </div>
  </NuxtLayout>
</template>
