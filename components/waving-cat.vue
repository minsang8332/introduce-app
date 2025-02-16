<template>
    <img
        ref="wavingCatRef"
        src="@/assets/images/waving-cat.gif"
        class="absolute z-[999999] w-[4rem] cursor-pointer transition-[top,left] duration-300 ease-out"
        v-tooltip="sayRef"
        @mouseenter="onLoadWavingCat"
    />
</template>
<script setup lang="ts">
const wavingCatRef = ref<HTMLElement | null>(null)
const sayRef = ref<string>('안녕?')
const onLoadWavingCat = (event?: MouseEvent) => {
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
    onLoadWavingCat()
})
</script>
