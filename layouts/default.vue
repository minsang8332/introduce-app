<template>
    <div class="container mx-auto max-w-4xl">
        <header
            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 md:items-center h-[4rem] px-4"
        >
            <div class="flex items-center gap-4">
                <div class="hidden md:block">
                    <NuxtLink to="/" class="text-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                        >MINSANG</NuxtLink
                    >
                </div>
                <nav class="font-mono">
                    <ul class="flex flex-col md:flex-row md:space-x-4">
                        <li>
                            <NuxtLink to="/diary" class="nav">Diary</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <ClientOnly>
                <select-color-scheme />
            </ClientOnly>
        </header>
        <main class="p-2 mt-10">
            <slot />
        </main>
    </div>
</template>
<script setup>
useHead({
    titleTemplate: '%s - minsang8332',
    link: [
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
            crossorigin: '',
        },
    ],
})
</script>
<style>
body {
    font-family: 'Roboto';
    @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300;
}
</style>
<style scoped>
.nav {
    @apply p-1 hover:bg-gray-100 hover:rounded dark:hover:bg-gray-800 dark:hover:rounded md:text-base;
}
</style>
