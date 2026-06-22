export default defineNuxtConfig({
  extends: 'docus',
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/']
    }
  }
})
