<template>
  <section class="overflow-hidden relative">
    <img
      class="shadow-xl rounded-lg hidden border-8 main-img lg:block absolute"
      src="~/assets/images/home.png"
    />
    <div class="container py-8 lg:h-screen">
      <div class="mb-16">
        <img src="~/assets/images/icon.png" class="inline-block" />
        <p class="inline-block ml-3 font-semibold text-lg">1Word</p>
      </div>
      <h3 class="text-4xl font-semibold text-light lg:w-5/12 md:w-8/12">
        Learn new language while browsing the web.
      </h3>
      <div class="mt-32">
        <a
          rel="noreferrer"
          href="https://chrome.google.com/webstore/detail/egkkjgnnebpeldfhiljmgfachakbbmph"
        >
          <button-ui large type="primary">
            Add to chrome
          </button-ui>
        </a>
        <nuxt-link to="/auth">
          <button-ui large class="ml-3" width="115px">
            Login
          </button-ui>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<style scoped>
.main-img {
  right: 0;
  transform: translate(25%, -50%);
  top: 50%;
  width: 850px;
}

@screen lg {
  section .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
