// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@pinia/nuxt'],
    content: {
        documentDriven: true,
        highlight: {
            theme: 'monokai',
            preload: ['javascript', 'java', 'php', 'dart'],
        },
    },
    colorMode: {
        classSuffix: '',
    },
    nitro: {
        prerender: {
            routes: ['/sitemap.xml'],
        },
    },
    compatibilityDate: '2025-02-14',
})
