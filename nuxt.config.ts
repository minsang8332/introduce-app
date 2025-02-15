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
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/content'],
    content: {
        highlight: {
            theme: 'monokai',
            preload: ['php', 'javascript', 'dart', 'java'],
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
