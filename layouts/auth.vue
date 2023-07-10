<template>
  <div class="container">
    <LayoutPublicNavbar />
    <div class="hero is-fullheight">
      <div class="hero-body is-justify-content-center">
        <div class="columns is-centered">
          <div class="column is-two-third is-justify-content-center">
            <slot />
          </div>
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