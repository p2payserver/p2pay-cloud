<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        <div class="full-body">
          <div>
            <OButton @click="logOut">{{ $t('logout') }}</OButton>
          </div>
          <main class="main-content">
            <slot />
          </main>
          <LayoutFooter />
        </div>
      </Body>
    </Html>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
});
const i18nHead = useLocaleHead({});

useHead({
  htmlAttrs: {
    lang: (i18nHead) ? i18nHead.value.htmlAttrs.lang : null
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
});

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
});

const { signOut } = useAuth();

const logOut = async () => {
  await signOut()
};

const { t } = useI18n();
</script>

<style scoped>
.full-body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main-content {
  flex: 1;
}
</style>