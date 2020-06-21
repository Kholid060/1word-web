<template>
  <div class="auth flex min-h-screen">
    <div class="max-w-xl w-full p-10 lg:px-16 lg:py-10">
      <div class="mb-12">
        <img src="~/assets/images/icon.png" class="inline-block" />
        <span class="text-xl font-semibold ml-3">1Word</span>
      </div>
      <transition name="slide-left" mode="out-in">
        <nuxt-child />
      </transition>
    </div>
    <div class="flex-grow hidden lg:block h-screen sticky top-0 bg-primary">
      <div class="h-full flex-col flex justify-center">
        <img
          src="~/assets/images/addWord.png"
          class="rounded-lg mx-auto"
          width="450px"
        />
        <p class="text-center text-lg mt-6" style="color: #9bc2fd">
          You can add a word by double click at it
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      titleTemplate: '%s - 1Word'
    };
  }
};
</script>
<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
