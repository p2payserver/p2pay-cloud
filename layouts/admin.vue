<script setup>
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
        <div class="ltr-full-body">
          <main class="ltr-main-content">
            <div class="columns">
              <nav class="column is-narrow">
                <section class="section is-medium">
                  <layoutAdminSidebar />
                </section>
              </nav>
              <div class="column">
                <section class="section">
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
