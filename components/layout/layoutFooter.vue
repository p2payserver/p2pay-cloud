<script setup>
  const { locale, locales } = useI18n();
  const { meta: { layout }} = useRoute();
  const isPublic = (layout !== 'admin' && layout !== 'dashboard');
  const switchLocalePath = useSwitchLocalePath();
  const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));
</script>

<template>
  <footer class="footer">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <OButton
            v-if="isPublic"
            :to="localePath('/admin')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('admin') }}</OButton>
          <OButton
            v-else
            :to="localePath('/')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('homePage') }}</OButton>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons">
            <OButton
              v-for="locale in availableLocales"
              :key="locale.code"
              tag="router-link"
              :to="switchLocalePath(locale.code)"
              variant="primary"
              inverted
            >{{ locale.name }}</OButton>
          </div>
        </div>
      </div>
    </nav>
  </footer>
</template>
