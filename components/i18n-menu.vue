<template>
    <div class="i18n-menu flex items-center">
        <button
            class="i18n-menu__button p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 dark:hover:rounded-full text-gray-500 text-xl md:text-base"
            @click="onNext"
        >
            <i :class="`fi fi-${getIcon}`"></i>
        </button>
    </div>
</template>
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
// computed
const getIcon = computed(() => {
    let icon = locale.value as string
    if (icon == 'en') {
        icon = 'us'
    }
    return icon
})
// methods
const onNext = () => {
    let nextIdx = 0
    const currIdx = locales.value.findIndex((l) => l.code == locale.value)
    if (locales.value[currIdx + 1]) {
        nextIdx = currIdx + 1
    }
    if (locales.value[nextIdx]) {
        setLocale(locales.value[nextIdx].code)
    }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/abstracts/mixins';
.i18n-menu {
    &__button {
        @include mixins.float-animation;
    }
}
</style>
