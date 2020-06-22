<template>
  <section class="overflow-hidden relative lg:mt-24">
    <div class="container py-8 lg:flex items-start">
      <div class="w-full lg:w-5/12 pr-16 py-6">
        <h3 class="text-4xl inline-block font-semibold text-light">
          Dashboard
        </h3>
        <p class="mt-1">
          Dashboard to manage the words that you have added and list of your
          practice history.
        </p>
        <ul class="mt-8">
          <li v-for="feature in features" :key="feature.icon" class="mb-4">
            <span class="p-3 bg-input mr-4 rounded-lg inline-block">
              <v-mdi :name="feature.icon"></v-mdi>
            </span>
            <span>{{ feature.name }}</span>
          </li>
        </ul>
      </div>
      <img
        class="shadow-xl rounded-lg border-8 lg:w-7/12"
        src="~/assets/images/dashboard.png"
      />
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    features: [
      { icon: 'mdi-message-processing', name: 'Manage your words' },
      { icon: 'mdi-chart-areaspline-variant', name: 'Charts' },
      { icon: 'mdi-history', name: 'Practice history' }
    ]
  })
};
</script>
