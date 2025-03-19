<script setup>
import { locales as allLocales } from './assets/js/locales';
import find from 'lodash.find';

  const {
    profile,
    service
  } = defineProps({
    profile: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    }
  });

  const {
    locale
  } = useI18n();

  let settings;
  try {
    settings = await queryContent(`settings/${profile}`).findOne();
  } catch (error) {
    await navicateTo(`${locale.value}/dashboard/general/settings`)
  }

  const { languages } = settings; 
  const merchantLanguages = languages.map(lang => find(allLocales, { code: lang}));

  const initialForm = {
    disabled: false,
    title: merchantLanguages.reduce((obj, lang) => {
      obj[lang.code] = '';
      return obj;
    }, {}),
    description: merchantLanguages.reduce((obj, lang) => {
      obj[lang.code] = '';
      return obj;
    }, {}),
    image: null,
    gallery: [],
    duration: null,
    price: null,
    currency: null,
    extras: [],
    body: merchantLanguages.reduce((obj, lang) => {
      obj[lang.code] = '';
      return obj;
    }, {}),
  };

  let userForm;
  try {
    userForm = await queryContent(`services/${profile}/${service}`).findOne();
  } catch (error) {
    userForm = initialForm;
  };
  
  const form = ref(userForm);

  const validationSchema = {
    title: {
      required: true
    },
    description: {
      required: true
    },
    duration: {
      required: true
    },
    price: {
      required: true
    },
    currency: {
      required: true
    },
    body: {
      required: true
    }
  };

  const postMedia = async (name, base64DataUrl) => {

    await useFetch(`/api/dashboard/content/`, {
      key: `post-${name}`,
      method: 'POST',
      headers: {
        'Content-Type': `image/webp`
      },
      query: {
        slug: name,
        path: `public/gallery/${profile}/${service}`
      },
      body:{ 
        content: base64DataUrl
      },
    });
  }

  const isLoading =ref(false);

  let imageTemp = ref(null);

  const activeTab = ref(merchantLanguages.length);

  onMounted(async () => {

    activeTab.value = 0;

    const image  = document.getElementById('image');

    const handleFilesSelect = () => {

      isLoading.value = true;

      const file = image.files[0];

      const name = file.name;

      const reader = new FileReader();

      reader.onload = async (event) => {

        const base64DataUrl = event.target.result;
          
        imageTemp.value = {
          id: name,
          type: 'image',
          preview: base64DataUrl
        };

        await postMedia(name, base64DataUrl);

        isLoading.value = false;
      };

      reader.readAsDataURL(file);
    }
    image.addEventListener('change', handleFilesSelect);
  });

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
        slug: `${language}.json`
      },
      body: {
        content: form.value
      }
    });
  };

</script>


<template>
<div>
  <OLoading 
    :full-page="true" 
    v-model:active="isLoading" 
    iconSize="large"
  />
  <OModal 
    v-model:active="isModalActive" 
    :canCancel="true"
  >
    <EmojisPicker />
  </OModal>

  <VForm
    name="serviceSettings"
    :validation-schema="validationSchema"
    @submit="updateService"
  >
    <OTabs v-model="activeTab" :multiline="true">
      <OTabItem 
        v-for="(lang, index) of merchantLanguages"
        :key="lang.code"
        :label="lang.name"
        :value="index"
      >
        <VField
          :name="'title ' + lang.name"
          :label="$t('serviceSettingsForm.title') + ' ' + lang.name"
          v-slot="{ handleChange, handleBlur, value, errors }"
          v-model="form.title[lang.code]"
        >
          <OField
            :label="$t('serviceSettingsForm.title') + ' ' + lang.name"
            :variant="errors[0] ? 'danger' : null"
            :message="errors[0] ? errors[0] : ''"
          >
            <OInput
              :label="$t('serviceSettingsForm.title') + ' ' + lang.name"
              :aria-label="$t('serviceSettingsForm.title') + ' ' + lang.name"
              :model-value="value"
              @update:modelValue="handleChange"
              @change="handleChange"
              @blur="handleBlur"
            />
          </OField>
        </VField>

        <VField
          :name="'description ' + lang.name"
          :label="$t('serviceSettingsForm.description') + ' ' + lang.name"
          v-slot="{ handleChange, handleBlur, value, errors }"
          v-model="form.description[lang.code]"
        >
          <OField
            :label="$t('serviceSettingsForm.description') + ' ' + lang.name"
            :variant="errors[0] ? 'danger' : null"
            :message="errors[0] ? errors[0] : ''"
          >
            <OInput
              :label="$t('serviceSettingsForm.description') + ' ' + lang.name"
              :aria-label="$t('serviceSettingsForm.description') + ' ' + lang.name"
              type="textarea"
              :rows="3"
              :model-value="value"
              @update:modelValue="handleChange"
              @change="handleChange"
              @blur="handleBlur"
            />
          </OField>
        </VField>

        <div class="columns">
          <div class="column is-half">
            <div class="ltr-replicate-label">{{ $t('serviceSettingsForm.body') }} {{ lang.name }}</div>
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
              v-model="form.body[lang.code]"
              :rows="10"
              :autosize="true"
            />
          </div>
          <div class="column is-half content">
            <div class="ltr-replicate-label">{{ $t('serviceSettingsForm.preview') }} {{ lang.name }}</div>
            <div v-html="$md().render(form.body[lang.code].replaceAll('\n', '  \n'))" />
          </div>
        </div>
      </OTabItem>
      <OTabItem 
        label=""
        :value="merchantLanguages.length"
      />
    </OTabs>

    <div class="ltr-replicate-label">{{ $t('serviceSettingsForm.image') }}</div>
      <div class="columns is-mobile is-multiline">
        <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
          <OField class="is-hidden-mobile is-hidden-tablet">
            <input
              id="image"
              ref="image"
              style="display:none"
              type="file"
              accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .tif, .webp, .svg, .ico, .mp4, .avi, .mkv, .mov, .wmv, .flv, .webm, .mpg, .mpeg, .rm, .rmvb, .3gp, .ts, .vob, .m2ts, .ogv, .mts"
            >
          </OField>
          <div class="card">
            <div class="card-image">
              <figure class="image is-square">
                <img src="/others/white.jpg">
              </figure>
              <div @click.native="$refs.image.click()" class="card-content is-overlay ltr-is-center-center">
                <OIcon icon="plus-circle" size="large" />
              </div>
            </div>
          </div>
        </div>
        <DashboardServiceImageCard 
          v-if="form.image && !imageTemp" 
          :src="'/gallery/' + profile + '/' + service + '/' + form.image" 
          class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd" 
        />
        <DashboardServiceImageCard 
          v-if="imageTemp" :id="imageTemp.id" 
          :src="imageTemp.preview" 
          class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd" 
        />
      </div>
  </VForm>
</div>
</template>