<script setup>
  definePageMeta({
    layout: "dashboard"
  });

  const { 
    params: { 
      service 
    }
  } = useRoute();

  const { locale } = useI18n();
  
  const body = ref('');

  onMounted(async () => {

    let { description: initialBody } = await $fetch('/api/dashboard/content', {
      query: {
        path: `${locale.value}/services/learntheropes`,
        slug: `${service}.json`
      }
    });
    body.value = initialBody;

  })
  const { $md } = useNuxtApp();

  const getSelection = (refs) => {

    const start = refs.description.$refs.textarea.selectionStart;
    const end = refs.description.$refs.textarea.selectionEnd;
    return body.value.substring(start, end);
  }

  const replaceWith = (refs, replacement) => {
    const selection = getSelection(refs);
    return body.value.replace(selection, replacement.replace(`{selection}`, selection))
  };

  const formatBold = (refs) => {
    body.value = replaceWith(refs, '**{selection}**')
  };

  const formatItalic = (refs) => {
    body.value = replaceWith(refs, '*{selection}*')
  };

  const formatStrikeThrough = (refs) => {
    body.value = replaceWith(refs, '~~{selection}~~')
  };  
  
  const formatHeader1 = (refs) => {
    body.value = replaceWith(refs, '# {selection}')
  };

  const formatHeader2 = (refs) => {
    body.value = replaceWith(refs, '## {selection}')
  };

  const formatHeader3 = (refs) => {
    body.value = replaceWith(refs, '### {selection}')
  };

  const formatHeader4 = (refs) => {
    body.value = replaceWith(refs, '#### {selection}')
  };

  const formatHeader5 = (refs) => {
    body.value = replaceWith(refs, '##### {selection}')
  };

  const formatHeader6 = (refs) => {
    body.value = replaceWith(refs, '###### {selection}')
  };

  const formatListBullet = (refs) => {
    const selection = getSelection(refs);
    const replacement = selection.split('\n').map(line => `- ${line}`).join('\n');
    body.value = body.value.replace(selection, replacement);
  };

  const formatListNumbered = (refs) => {
    const selection = getSelection(refs);
    const replacement = selection.split('\n').map((line, index) => `${++index}. ${line}`).join('\n');
    body.value = body.value.replace(selection, replacement);
  };

  const formatQuote = (refs) => {
    const selection = getSelection(refs);
    const replacement = selection.split('\n').map(line => `> ${line}`).join('\n');
    body.value = body.value.replace(selection, replacement); 
  };

  const { $listen } = useNuxtApp();

  const isModalActive = ref(false);
  const cursorStart = ref(0);
  const cursorEnd = ref(0);

  $listen('addEmoji', emoji => {
    const left = body.value.substring(0, cursorStart.value);
    const right = body.value.substring(cursorEnd.value, body.value.length);
    body.value = left + emoji + right;
    isModalActive.value = false;
  });

  const openModal = (refs) => {
    isModalActive.value = true;
    cursorStart.value = refs.description.$refs.textarea.selectionStart;
    cursorEnd.value = refs.description.$refs.textarea.selectionEnd;
  };

</script>


<template>
<NuxtLayout>
  <OModal v-model:active="isModalActive" :canCancel="true">
    <EmojisPicker />
  </OModal>
  <div class="columns">
    <div class="column is-half">
      <div class="columns is-mobile is-multiline is-gapless">
        <div class="column is-narrow">
          <OButton
            @click.native="openModal($refs)"
            icon-left="emoticon"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatBold($refs)"
            icon-left="format-bold"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatItalic($refs)"
            icon-left="format-italic"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatStrikeThrough($refs)"
            icon-left="format-strikethrough"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatHeader1($refs)"
            icon-left="format-header-1"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatHeader2($refs)"
            icon-left="format-header-2"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatHeader3($refs)"
            icon-left="format-header-3"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatHeader4($refs)"
            icon-left="format-header-4"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatHeader5($refs)"
            icon-left="format-header-5"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatHeader6($refs)"
            icon-left="format-header-6"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatListBullet($refs)"
            icon-left="format-list-bulleted"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatListNumbered($refs)"
            icon-left="format-list-numbered"
            variant="success"
            inverted
          />
        </div>
        <div class="column is-narrow">
          <OButton
            @click.native="formatQuote($refs)"
            icon-left="format-quote-open"
            variant="success"
            inverted
          />
        </div>
      </div>
      <OInput 
        ref="description"
        type="textarea"
        v-model="body"
        :autosize="true"
      />
    </div>
    <div class="column is-half content">
      <div v-html="$md().render(body.replaceAll('\n', '  \n'))" />
    </div>
  </div>
</NuxtLayout>
</template>