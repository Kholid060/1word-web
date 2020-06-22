export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: '1Word',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'light-theme'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0052cc' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    './plugins/ui-components',
    './plugins/vue-mdijs',
    './plugins/filters',
    './plugins/nuxt-client-init.js',
    './plugins/v-tooltip',
    './plugins/vue-js-modal',
    './plugins/vue-awesome-swiper'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    cssPath: '~/assets/scss/base/tailwind.scss'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/toast'
  ],
  toast: {
    duration: 3000
  },
  generate: {
    fallback: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      });
    }
  }
};
