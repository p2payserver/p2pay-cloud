<script setup>
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: `/dashboard`,
  }
});

const {
  path,
  fullPath,
  query: {
    error
  }
} = useRoute();

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const {
  locale,
  t
} = useI18n();

const userLocale = useCookie('userLocale', { maxAge: 60 * 10 });
 
if (locale.value !== userLocale.value && path !== `/${userLocale.value}/auth/error`) {

  await navigateTo(fullPath.replace(`/${locale.value}/auth/error`, `/${userLocale.value}/auth/error`))
}

let translatedErrorMessage;
switch(error) {
  case 'Configuration':
    translatedErrorMessage = t('error.configuration')
    break;
  case 'AccessDenied':
    translatedErrorMessage = t('error.accessDenied')
    break;
  case 'Verification':
    translatedErrorMessage = t('error.verification')
    break;
  default:
    translatedErrorMessage = t('error.generic')
};

const tryAgain = async () => {
  await navigateTo({
    path: `/${locale.value}/auth/login`,
    query: {
      callbackUrl: `${deploymentDomain}/${locale.value}/dashboard`
    }
  })
}
</script>

<template>
  <NuxtLayout>
      <div class="content ltr-has-new-line">{{ translatedErrorMessage }}</div>
      <OButton @click.native="tryAgain" variant="primary" outlined>{{ $t('error.tryAgain') }}</OButton> 
  </NuxtLayout>
</template>