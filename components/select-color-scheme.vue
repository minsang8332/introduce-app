<template>
    <div class="select-color-scheme flex space-x-2 items-center">
        <button
            class="select-color-scheme__button hover:bg-gray-200 hover:rounded-full dark:hover:bg-gray-600 dark:hover:rounded-full p-2 text-gray-500 text-xl md:text-base"
            @click="toggleMode"
            @mouseenter="showNextModelLabel = true"
            @mouseleave="showNextModelLabel = false"
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
<style lang="scss" scoped>
.select-color-scheme {
    &__button {
        transition: transform 0.3s ease-in-out;
        &:hover {
            animation: float-animation 0.6s infinite ease-in-out alternate;
        }
        &:active {
            transform: scale(2);
        }
        @keyframes float-animation {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-0.25rem);
            }
        }
    }
}
</style>
