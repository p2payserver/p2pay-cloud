<template>
  <nav class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <OButton
          class="disabled"
          variant="success"
          inverted
        >
          <span class="has-text-weight-bold">AnyBTCPay</span>
          <span>&nbsp;</span>
          <span>0.1</span>
        </OButton>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  /* Vertical padding to match the navbar */
.level {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.disabled{
  pointer-events: none;
}
</style>