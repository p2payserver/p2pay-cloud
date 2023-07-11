<script setup>
const {
  locale: {
    value: locale
  },
  t
} = useI18n();

const { fullPath } = useRoute();
const pagePath = fullPath.split('/').slice(3);
const title = pagePath.map(segment => t(`menu.${segment}`)).join(' - ') || '';

const i18nHead = useLocaleHead({});

useHead({
  title: `${t('menu.dashboard')}: ${title}`,
  htmlAttrs: {
    lang: (i18nHead) ? i18nHead.value.htmlAttrs.lang : null
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
});

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: false
});
</script>

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
        <div class="ltr-full-body container">
          <main class="ltr-main-content">
            <layoutDashboardNavbar />
            <div class="columns">
              <nav class="column is-narrow is-hidden-mobile">
                <layoutDashboardSidebar />
              </nav>
              <div class="column">
                <section class="section">
                  <nav
                    v-if="fullPath !== '/' + locale + '/dashboard'"
                    class="breadcrumb"
                  >
                    <ul>
                      <li
                        v-for="segment in pagePath"
                        class="is-active title"
                      >
                        <a>{{ $t(`menu.${segment}`) }}</a>
                      </li>
                    </ul>
                  </nav>
                  <slot />
                </section>
              </div>
            </div>
          </main>
          <LayoutFooter />
        </div>
      </Body>
    </Html>
  </div>
</template>
