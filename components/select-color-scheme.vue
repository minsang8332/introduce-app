<template>
    <div class="flex space-x-2 items-center">
        <button
            @click="toggleMode"
            @mouseenter="showNextModelLabel = true"
            @mouseleave="showNextModelLabel = false"
            class="hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:rounded p-2 text-gray-500 text-xl md:text-base"
        >
            {{ nextModeIcon }}
        </button>
    </div>
</template>

<script setup>
const showNextModelLabel = ref(false)
const colorMode = useColorMode()
const modes = ['light', 'dark']
const nextModeIcons = {
    light: '🌙',
    dark: '🌤️',
}
const nextMode = computed(() => {
    const currentModeIndex = modes.indexOf(colorMode.preference)
    let nextModeIndex = null
    if (currentModeIndex + 1 === modes.length) {
        nextModeIndex = 0
    } else {
        nextModeIndex = currentModeIndex + 1
    }
    return modes[nextModeIndex]
})
const nextModeIcon = computed(() => nextModeIcons[nextMode.value])
const toggleMode = () => (colorMode.preference = nextMode.value)
</script>
