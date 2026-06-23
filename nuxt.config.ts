// Docus enables its AI assistant automatically when Vercel injects OIDC.
// This site does not use that feature, and the extra bundle path stalls Vercel builds.
delete process.env.VERCEL_OIDC_TOKEN

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
