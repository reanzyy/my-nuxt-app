// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4
  },
  nitro: {
    devProxy: {
      '/_nuxt/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  runtimeConfig: {
    API_URL: "http://localhost:8000",
    public: {
      API_URL: "http://localhost:8000",
    }
  },
})