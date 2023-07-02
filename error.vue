<script setup>
useContentHead({
  title: props.error.statusCode,
  description: props.error.message
});

const props = defineProps({
  error: Object,
  required: true
});

const {
  locale: {
    value: locale
  },
  t
} = useI18n();

const handleError = () => clearError({ redirect: `/${locale}` });
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p v-if="error.statusCode === 404" class="title">{{ $t('pageNotFound') }}</p>
        <p v-else-if="error.statusCode === 401" class="title">{{ $t('unauthorized') }}</p>
        <p v-else class="title">{{$t('somethingWentWrong')}}</p>
        <DevOnly class="block">
          <div class="content">
            <div>{{ error.statusMessage || error.message }}</div>
            <div>{{ error.stack }}</div>
          </div>
        </DevOnly>
          <button @click="handleError" class="button is-primary is-outlined">{{ $t('backToTheHomePage') }}</button>
      </div>
    </div>
  </div>
</template>