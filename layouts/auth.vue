<template>
  <div class="container">
    <LayoutPublicNavbar />
    <div class="hero is-fullheight">
      <div class="hero-body is-justify-content-center">
        <div class="custom is-hidden-mobile">
          <slot />
        </div>
        <div class="is-hidden-tablet">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom {
  max-width: 50%;
}
</style>