// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@pinia/nuxt', '@nuxtjs/i18n'],
    compatibilityDate: '2025-02-14',
    app: {
        pageTransition: {
            name: 'fade',
            mode: 'out-in',
            duration: 300,
        },
    },
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
    css: ['flag-icons/css/flag-icons.min.css', '@/assets/styles/main.scss'],
    i18n: {
        strategy: 'no_prefix',
        defaultLocale: 'en',
        locales: [
            { code: 'en', file: 'en-US.yaml' },
            { code: 'jp', file: 'ja-JP.yaml' },
            { code: 'kr', file: 'ko-KR.yaml' },
        ],
        detectBrowserLanguage: false,
        lazy: true,
    },
})
