<template>
  <div class="container">
    <LayoutAuthNavbar />
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
