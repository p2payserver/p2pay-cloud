<script setup>
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
  const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));
</script>

<template>
  <footer class="footer">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <OButton
            :to="localePath('/documentation')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('footer.documentation') }}</OButton>
        </div>
        <div class="level-item">
          <OButton
            href="mailto:server@p2pay.cloud"
            tag="a"
            target="_blank"
            variant="primary"
            inverted
          >{{ $t('footer.support') }}</OButton>
        </div>
        <div class="level-item">
          <OButton
            href="https://keys.openpgp.org/vks/v1/by-fingerprint/5BA78A510CDA44132BDC51FA58C798100FF8A743"
            tag="a"
            target="_blank"
            variant="primary"
            inverted
          >PGP</OButton>
        </div>
        <div class="level-item">
          <OButton
            :to="localePath('/admin')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('footer.admin') }}</OButton>
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

<style scoped>
.footer {
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>
