<script setup>
definePageMeta({
  layout: "dashboard"
});

const { 
  data: auth
} = useAuth();
const email = auth.value.user.email;

const initialForm = {
  gateways: {
    bitcoin: true,
    fiat: true,
    crypto: true
  },
  premium: 8,
  btcpay: {
    storeid: null,
    host: null,
    apikey: null,
  },
  concurrency: 'parallel', // serial
  availability: [
    {
      from: null,
      to: null
    },
    {
      from: null,
      to: null
    },
    {
      from: null,
      to: null
    },
    {
      from: null,
      to: null
    },
    {
      from: null,
      to: null
    },
    {
      from: null,
      to: null
    },
    {
      from: null,
      to: null
    }
  ],
  fields: {
    name: false,
    email: 'required',
    pgp: false,
    details: true
  }
}

let profile;
try {
  profile = 'learntheropes' 
} catch (error) {
  profile = 'learntheropes'
}

let userForm;
try {
  userForm = await queryContent(`/settings/${profile}`).findOne();
} catch (error) {
  userForm = initialForm;
}

const form = ref(userForm);

const validationSchema = {};

const updateSettings = async () => {
  await $fetch('/api/dashboard/content', {
    method: 'POST',
    query: {
      path: `settings/${profile}`,
      slug: `${locale.value}.json`
    },
    body: {
      content: form.value
    }
  });
}

</script>

<template>
  <NuxtLayout>
    <VForm
      name="settings"
      :validation-schema="validationSchema"
      @submit="updateSettings"
    >
    </VForm>
  </NuxtLayout>
</template>