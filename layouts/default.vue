<template>
    <div class="container mx-auto max-w-4xl">
        <header
            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 md:items-center h-[4rem] px-4"
        >
            <div class="flex items-center gap-4">
                <div>
                    <NuxtLink to="/" class="text-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                        >MINSANG</NuxtLink
                    >
                </div>
                <nav class="font-mono">
                    <ul class="flex">
                        <li>
                            <NuxtLink to="/note" class="nav-link">{{ $t('layout.default.nav.note') }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <ClientOnly>
                <div class="flex items-center gap-2">
                    <i18n-menu />
                    <color-scheme-menu />
                </div>
            </ClientOnly>
        </header>
        <main class="p-4 pt-8">
            <slot />
        </main>
    </div>
</template>
<style scoped>
.nav-link {
    @apply p-1 hover:bg-gray-100 hover:rounded dark:hover:bg-gray-800 dark:hover:rounded md:text-base;
}
</style>
