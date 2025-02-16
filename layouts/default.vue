<template>
    <div class="container mx-auto" :class="getClassList">
        <header
            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 md:items-center h-[4rem] px-4"
        >
            <div class="flex items-center gap-4">
                <NuxtLink to="/" class="text-xl p-2 rounded font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                    >MINSANG</NuxtLink
                >
                <nav>
                    <ul class="flex items-end">
                        <li>
                            <NuxtLink to="/note" class="hover:bg-gray-100 rounded dark:hover:bg-gray-800 text-sm p-2">{{
                                $t('layout.default.nav.note')
                            }}</NuxtLink>
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
<script setup lang="ts">
import _ from 'lodash'
const route = useRoute()
const getClassList = computed(() =>
    _.isString(route.meta.layoutClassList) ? _.toString(route.meta.layoutClassList) : 'max-w-full md:max-w-4xl'
)
</script>
