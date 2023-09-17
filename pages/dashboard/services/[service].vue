<script setup>
  definePageMeta({
    layout: "dashboard"
  });

  // const { 
  //   data: auth
  // } = useAuth();
  // const email = auth.value.user.email;

  let profile;
  try {
    const { data } = await $fetch('/api/dashboard/fauna');
    profile = data.bookingProfile;
  } catch (error) {
    profile = 'learntheropes'
  }

  const { 
    params: { 
      service 
    }
  } = useRoute();

  const { locale } = useI18n();

  const initialForm = {
    body: null
  }

  let userForm;
  try {
    userForm = await queryContent(`services/${profile}/${service}/${locale.value}`).findOne();
  } catch (error) {
    userForm = initialForm;
  }
  
  const form = ref(userForm);

  const { $md } = useNuxtApp();

  const getSelection = (refs) => {

    const start = refs.body.$refs.textarea.selectionStart;
    const end = refs.body.$refs.textarea.selectionEnd;
    return form.value.body.substring(start, end);
  }

  const replaceWith = (refs, replacement) => {
    const selection = getSelection(refs);
    return form.value.body.replace(selection, replacement.replace(`{selection}`, selection))
  };

  const formatBold = (refs) => {
    form.value.body = replaceWith(refs, '**{selection}**')
  };

  const formatItalic = (refs) => {
    form.value.body = replaceWith(refs, '*{selection}*')
  };

  const formatStrikeThrough = (refs) => {
    form.value.body = replaceWith(refs, '~~{selection}~~')
  };  
  
  const formatHeader1 = (refs) => {
    form.value.body = replaceWith(refs, '# {selection}')
  };

  const formatHeader2 = (refs) => {
    form.value.body = replaceWith(refs, '## {selection}')
  };

  const formatHeader3 = (refs) => {
    form.value.body = replaceWith(refs, '### {selection}')
  };

  const formatHeader4 = (refs) => {
    form.value.body = replaceWith(refs, '#### {selection}')
  };

  const formatHeader5 = (refs) => {
    form.value.body = replaceWith(refs, '##### {selection}')
  };

  const formatHeader6 = (refs) => {
    form.value.body = replaceWith(refs, '###### {selection}')
  };

  const formatListBullet = (refs) => {
    const selection = getSelection(refs);
    const replacement = selection.split('\n').map(line => `- ${line}`).join('\n');
    form.value.body = form.value.body.replace(selection, replacement);
  };

  const formatListNumbered = (refs) => {
    const selection = getSelection(refs);
    const replacement = selection.split('\n').map((line, index) => `${++index}. ${line}`).join('\n');
    form.value.body = form.value.body.replace(selection, replacement);
  };

  const formatQuote = (refs) => {
    const selection = getSelection(refs);
    const replacement = selection.split('\n').map(line => `> ${line}`).join('\n');
    form.value.body = form.value.body.replace(selection, replacement); 
  };

  const { $listen } = useNuxtApp();

  const isModalActive = ref(false);
  const cursorStart = ref(0);
  const cursorEnd = ref(0);

  $listen('addEmoji', emoji => {
    const left = form.value.body.substring(0, cursorStart.value);
    const right = form.value.body.substring(cursorEnd.value, form.value.body.length);
    form.value.body = left + emoji + right;
    isModalActive.value = false;
  });

  const openModal = (refs) => {
    isModalActive.value = true;
    cursorStart.value = refs.body.$refs.textarea.selectionStart;
    cursorEnd.value = refs.body.$refs.textarea.selectionEnd;
  };

  const updateService = async () => {
    await $fetch('/api/dashboard/content', {
      method: 'POST',
      query: {
        path: `services/${profile}`,
        slug: `${locale.value}.json`
      },
      body: {
        content: form.value
      }
    });
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
        ref="body"
        type="textarea"
        v-model="form.body"
        :rows="10"
        :autosize="true"
      />
    </div>
    <div class="column is-half content">
      <div v-html="$md().render(form.body.replaceAll('\n', '  \n'))" />
    </div>
  </div>
</NuxtLayout>
</template>