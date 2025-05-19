// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
  }, compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
})
