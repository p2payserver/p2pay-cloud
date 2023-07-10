<script setup>
import find from 'lodash.find';
import { locales, defaultLocale } from '~/assets/js/locales'

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `/${locale}/dashboard`
  }
});

// redirect to locale
// because nuxt-auth always redirect to the defaut one
const { query } = useRoute();

const locale = (
  query
  && query.callbackUrl
  && find(locales, { code: query.callbackUrl.split('/')[3] })
)
  ? query.callbackUrl.split('/')[3]
  : defaultLocale;

console.log('locale', locale)
const { fullPath } = useRoute();
if (fullPath.split('?')[0] === '/auth/login') navigateTo(fullPath.replace(`/auth/login`, `/${locale}/auth/login`));

const { signIn } = useAuth();

const form = ref({
  loginEmail: '',
});

const validationSchema = {
  loginEmail: {
    required: true,
    email: true
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
        :label="$t('auth.loginEmail')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.loginEmail"
      >
        <OField
          :label="$t('auth.loginEmail')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OInput
            :label="$t('auth.loginEmail')"
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
        >{{ $t('auth.magicLink') }}</OButton>
      </OField>
    </VForm>
    <section class="section">
      <div class="ltr-has-new-line">{{  $t('auth.magicLinkInstructions') }}</div>
    </section>
  </div>
  </NuxtLayout>
</template>
