<script setup>
import dashboard from '~/assets/json/dashboard.json';

const { data } = useAuth();
</script>

<template>
  <section class="section ltr-sticky">
    <OMenu>
      <OMenuList :label="data.user.email">
        <div 
          v-for="main in Object.keys(dashboard)" 
          :key="main"
        >
          <OMenuItem expanded>
            <template
              v-if="typeof dashboard[main] === 'object'"
              #label="props"
            >{{ $t(main) }}</template>
            <OMenuItem
              v-if="typeof dashboard[main] === 'object'"
              v-for="item in Object.keys(dashboard[main])"
              :key="item"
              :label="$t(item)"
              tag="router-link"
              :to="localePath(dashboard[main][item])"
            />
          </OMenuItem>
          <OMenuItem
            v-if="typeof dashboard[main] === 'string'"
            :label="$t(main)"
            tag="router-link"
            :to="localePath(dashboard[main])"
          />
        </div>
      </OMenuList>
    </OMenu>
  </section>
</template>
