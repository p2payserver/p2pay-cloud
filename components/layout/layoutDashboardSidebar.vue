<script setup>
import dashboard from '~/assets/json/dashboard.json';

let profile;
try {
  const { bookingProfile } = await $fetch('/api/dashboard/fauna');
  profile = bookingProfile;
} catch (error) {
  profile = null;
};

const {
  locale
} = useI18n();

const services = (profile) ? await queryContent(`services/${profile}`).find() : [];
</script>

<template>
  <section class="ltr-sticky">
    <OMenu>
      <OMenuList>
        <div 
          v-for="main in Object.keys(dashboard)" 
          :key="main"
        >
          <OMenuItem expanded>
            <template
              v-if="typeof dashboard[main] === 'object'"
              #label="props"
            >{{ $t(main) }}</template>
            <OMenuItem
              v-if="typeof dashboard[main] === 'object'"
              v-for="item in Object.keys(dashboard[main])"
              :key="item"
              :label="$t(item)"
              tag="router-link"
              :to="localePath(dashboard[main][item])"
            />
          </OMenuItem>
          <OMenuItem
            v-if="typeof dashboard[main] === 'string'"
            :label="$t(main)"
            tag="router-link"
            :to="localePath(dashboard[main])"
          />
        </div>
      </OMenuList>
      <OMenuList>
        <OMenuItem expanded>
          <template
            #label="props"
          >{{ $t('sidebar.services') }}</template>
          <div 
            v-for="service of services" 
            :key="service._path"
          >
            <OMenuItem
              :label="service.title[locale]"
              tag="router-link"
              :to="localePath(`/dashboard/services/${service._path.replace(`/services/${profile}/`, '')}`)"
            />
          </div>
        </OMenuItem>
      </OMenuList>
    </OMenu>
  </section>
</template>
