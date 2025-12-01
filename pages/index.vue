<script setup>
import startCase from 'lodash.startcase';

definePageMeta({
  auth: false
});

const { locale, t } = useI18n();

const title = t('index.title');
const description = t('index.description');

useHead({
  title,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: description
    },
  ],
});

// redirect to locale only on the homepage
// because i18n settings do not work
const { fullPath } = useRoute();
if (fullPath === '/') navigateTo(`/${locale.value}`);

const paymentMethodsResponse = await $fetch('https://peach-cors-proxy.vercel.app/v1/info/paymentMethods')
const paymentMethods = paymentMethodsResponse
  .filter(method => !method.id.startsWith('cash.'))
  .map(method => `${startCase(method.id)} (${method.currencies.join(', ')})`)
  .join('\n');
</script>

<template>
  <NuxtLayout>
    <div class="hero is-medium">
      <div class="hero-body">
        <div class="has-text-centered">
          <div class="title">{{ title }}</div>
          <div class="content">
            <div class="block ltr-has-new-line">{{ description }}</div>
            <div class="block has-text-weight-semibold">{{ $t('index.openSource') }}
              <NuxtLink
                to="https://github.com/learntheropes/btcpay-any"
                target="_blank"
              >{{ $t('index.repo') }}</NuxtLink>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section no-horizzontal-padding">
      <div class="title is-5 has-text-centered">{{ $t('index.useCases.title') }}</div>
      <div class="columns">
        <div class="column is-one-third is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('index.useCases.bitcoiner.title') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.useCases.bitcoiner.description') }}</div>
          </div>
        </div>
        <div class="column is-one-third is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('index.useCases.highRisk.title') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.useCases.highRisk.description') }}</div>
          </div>
        </div>
        <div class="column is-one-third is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('index.useCases.sanctioned.title') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.useCases.sanctioned.description') }}</div>     
          </div>
        </div>
      </div>
    </div>
    <div class="section no-horizzontal-padding">
      <div class="title is-5 has-text-centered">{{ $t('index.paymentMethods.title') }}</div>
      <div class="columns">
        <div class="column is-one-half is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('index.paymentMethods.bitcoin.title') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.paymentMethods.bitcoin.description') }}</div>
          </div>
        </div>
        <div class="column is-one-half is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('index.paymentMethods.fiat.title') }}</div>
            <div class="content ltr-has-new-line">{{ paymentMethods }}</div>     
          </div>
        </div>
      </div>
    </div>
    <div class="section no-horizzontal-padding">
      <div class="title is-5 has-text-centered">{{ $t('index.services.title') }}</div>
      <div class="columns">
        <div class="column is-one-third is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('menu.invoicing') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.services.invoicing.description') }}</div>
          </div>
        </div>
        <div class="column is-one-third is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('menu.ecommerce') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.services.shopping.description') }}</div>
            </div>
        </div>
        <div class="column is-one-third is-flex is-flex-direction-column">
          <div class="box is-flex is-flex-direction-column is-flex-grow-1">
            <div class="title is-4">{{ $t('menu.booking') }}</div>
            <div class="content ltr-has-new-line">{{ $t('index.services.booking.description') }}</div>     
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.no-horizzontal-padding {
  padding: 3rem 0rem;
}
</style>