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
    <VForm
      name="settings"
      :validation-schema="validationSchema"
      @submit="updateSettings"
    >
      <VField
        name="buyerDate"
        :label="$t('buyerDate')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerDate"
      >
        <OField
          :label="$t('buyerDate')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <ODatepicker
            :label="$t('buyerDate')"
            :aria-label="$t('buyerDate')"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
            @change-month="onChangeMonth"
            @change-year="onChangeYear"
            :locale="locale.value"
            :showWeekNumber="showWeekNumber"
            :firstDayOfWeek="firstDayOfWeek"
            :unselectableDaysOfWeek="unselectableDaysOfWeek"
            :minDate="minDate"
            :modelValue="modelValue"
            inline
          />
        </OField>
      </VField>

      <VField
        name="buyerTime"
        :label="$t('buyerTime')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerTime"
      >
        <OField
          :label="$t('buyerTime')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OLoading
            :full-page="false"
            v-model:active="isLoadingFreeSlots"
            :can-cancel="false"
          >
            <OIcon pack="mdi" icon="loading" size="large" spin class="is-hidden-mobile" />
            <OIcon pack="mdi" icon="loading" size="small" spin class="is-hidden-tablet" />
          </OLoading>
          <OSelect
            :label="$t('buyerTime')"
            :aria-label="$t('buyerTime')"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
            :native-size="freeSlots.length || 3"
            multiple
            expanded
          >
            <option
              v-if="!form.buyerDate"
              disabled
            >
              {{ $t('selectDateFirst') }}
            </option>
            <option
              v-for="freeSlot of freeSlots"
              :key="freeSlot.value"
              :value="freeSlot.value"
            >{{ $t('from') }} {{ freeSlot.display.from }} {{ $t('to') }} {{ freeSlot.display.to }}</option>
          </OSelect>
        </OField>
        <p
          v-if="form.buyerTime.length"
          @click.native="clearTime"
          class="help is-primary"
        >
          <OIcon pack="mdi" icon="close" size="small" />
          {{ $t('clearSelection') }}
        </p>
      </VField>

      <VField
        v-if="extras && extras.length"
        name="buyerExtras"
        :label="$t('buyerExtras')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerExtras"
      >
        <OField
          :label="$t('buyerExtras')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OSelect
            :label="$t('buyerExtras')"
            :aria-label="$t('buyerExtras')"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
            :native-size="extras.length"
            multiple
            expanded
          >
            <option
              v-for="extra of extras"
              :key="extra.title"
              :value="extra"
            >{{ extra.title }}</option>
          </OSelect>
        </OField>
        <p
          v-if="form.buyerExtras.length"
          @click.native="clearExtras"
          class="help is-primary"
        >
          <OIcon pack="mdi" icon="close" size="small" />
          {{ $t('clearSelection') }}
        </p>
      </VField>

      <VField
        name="buyerName"
        :label="$t('buyerName')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerName"
      >
        <OField
          v-if="name"
          :label="$t('buyerName')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OInput
            :label="$t('buyerName')"
            :aria-label="$t('buyerName')"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
          />
        </OField>
      </VField>

      <VField
        name="buyerEmail"
        :label="$t('buyerEmail')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerEmail"
      >
        <OField
          v-if="email"
          :label="$t('buyerEmail')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OInput
            :label="$t('buyerEmail')"
            :aria-label="$t('buyerEmail')"
            type="email"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
          />
        </OField>
      </VField>

      <!-- 5BA78A510CDA44132BDC51FA58C798100FF8A743 -->
      <VField
        name="buyerFingerprint"
        :label="$t('buyerFingerprint')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerFingerprint"
      >
        <OField
          v-if="pgp"
          :label="$t('buyerFingerprint')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : $t('fingerprintOnServer')"
        >
          <!-- https://github.com/logaretm/vee-validate/issues/3575#issuecomment-1516900983 -->
          <OInput
            :label="$t('buyerFingerprint')"
            :aria-label="$t('buyerFingerprint')"
            :model-value="value"
            @change="handleChange"
            @blur="handleBlur"
            expanded
          />
        </OField>
      </VField>

      <VField
        name="buyerDetails"
        :label="$t('buyerDetails')"
        v-slot="{ handleChange, handleBlur, value, errors }"
        v-model="form.buyerDetails"
      >
        <OField
          v-if="details"
          :label="$t('buyerDetails')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
        >
          <OInput
            :label="$t('buyerDetails')"
            :aria-label="$t('buyerDetails')"
            type="textarea"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
            expanded
            :maxlength="250"
            :hasCounter="true"
          />
        </OField>
      </VField>

      <p class="help">{{ $t('getDiscount', { premium: premium + 2 }) }}</p>

      <OField>
        <OButton
          variant="primary"
          @click.native="setGateway('bitcoin', 'bitcoin', 'BTC')"
          native-type="submit"
          icon-right="sale"
          expanded
        >{{ `${$t('payWith')} bitcoin ${priceInBitcoin} BTC` }}</OButton>
      </OField>

      <p 
        v-if="gateways.fiat && buyerPaymentMethods.length"
        class="help"
      >{{ $t('approximatePrice') }}</p>

      <OField
        grouped 
        group-multiline
      >
        <OButton
          v-if="gateways.fiat && buyerPaymentMethods.length"
          v-for="paymentMethod in buyerPaymentMethods"
          :key="paymentMethod.id"
          variant="primary"
          outlined
          @click="setGateway('fiat', paymentMethod.id, buyerCurrency)"
          native-type="submit"
          expanded
        >{{ `${$t('payWith')} ${paymentMethod.name} ${priceInBuyerCurrency} ${form.buyerFiatCurrency}` }}</OButton>
        <div v-else>{{ $t('fiatNotAvailable') }}</div>
      </OField>

      <VField
        name="changeCurrency"
        :label="$t('changeCurrency')"
        v-slot="{ handleChange, handleBlur, value }"
        v-model="form.buyerFiatCurrency"
      >
        <OField
          :label="$t('changeCurrency')"
          class="change"
        >
          <OSelect
            :label="$t('changeCurrency')"
            :aria-label="$t('changeCurrency')"
            :model-value="value"
            @update:modelValue="handleChange"
            @change="handleChange"
            @blur="handleBlur"
            expanded
          >
            <option
              v-for="currency of peachAvailableCurrencies"
              :key="currency"
              :value="currency"
            >{{ currency }}</option>
          </OSelect>
        </OField>
      </VField>
    </VForm>
</template>