<template>
  <div class="container">
    <div class="hero is-fullheight">
      <div class="hero-head">
        <LayoutAuthNavbar />
      </div>
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
