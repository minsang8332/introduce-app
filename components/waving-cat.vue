<template>
    <div
        ref="wavingCatRef"
        :style="{
            backgroundImage: `url('${imgWavingCat}')`,
        }"
        class="absolute z-[999999] h-[4rem] w-[4rem] bg-cover bg-center cursor-pointer select-none transition-[top,left] duration-300 ease-out"
        v-tooltip="sayRef"
        @mouseenter.self="onMove"
        @click.self="onMove"
    />
</template>
<script setup lang="ts">
import imgWavingCat from '@/assets/images/waving-cat.gif'
const { t } = useI18n()
const wavingCatRef = ref<HTMLElement | null>(null)
const sayRef = ref<string>(t('components.waving-cat.tooltip'))
const onMove = (event?: MouseEvent) => {
    if (wavingCatRef.value) {
        const catWidth = wavingCatRef.value.offsetWidth
        const catHeight = wavingCatRef.value.offsetHeight
        const x = Math.round(Math.random() * 100)
        const y = Math.round(Math.random() * 100)
        wavingCatRef.value.style.left = `calc(${x}% - ${catWidth}px)`
        wavingCatRef.value.style.top = `calc(${y}% - ${catHeight}px)`
    }
}
onMounted(() => {
    onMove()
})
</script>
