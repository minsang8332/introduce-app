<template>
    <div class="color-scheme-menu flex items-center">
        <button
            class="color-scheme-menu__button p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 dark:hover:rounded-full text-gray-500 text-xl md:text-base"
            @click="onNext"
        >
            {{ getIcon }}
        </button>
    </div>
</template>

<script setup lang="ts">
// types
enum COLOR_SCHEME {
    DARK = 'dark',
    LIGHT = 'light',
}
// composables
const colorMode = useColorMode()
// data
const colorSchemes = {
    light: '🌤️',
    dark: '🌙',
}
// computed
const getIcon = computed(() => {
    let icon = null
    const key = colorMode.preference as COLOR_SCHEME
    if (colorSchemes[key]) {
        icon = colorSchemes[key]
    }
    return icon
})
// methods
const onNext = () => {
    colorMode.preference = colorMode.preference == COLOR_SCHEME.LIGHT ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/abstracts/mixins';
.color-scheme-menu {
    &__button {
        @include mixins.float-animation;
    }
}
</style>
