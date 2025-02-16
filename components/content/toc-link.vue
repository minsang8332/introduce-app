<template>
    <ul>
        <li v-for="link in links" :key="link.id" class="truncate">
            <NuxtLink
                :to="{ path: route.path, hash: `#${link.id}` }"
                class="text-sm text-nowrap truncate"
                :class="{
                    active: activeId == link.id,
                    'ml-4': level,
                }"
            >
                {{ link.text }}
            </NuxtLink>
            <TocLink :links="link.children" :level="level + 1" :activeId="activeId" />
        </li>
    </ul>
</template>
<script setup>
const route = useRoute()
defineProps({
    links: Array,
    level: {
        type: Number,
        default: 0,
    },
    activeId: {
        type: String,
        default: null,
    },
})
</script>
<style lang="scss" scoped>
.active {
    @apply text-green-600 dark:text-green-600;
    &:before {
        content: '📖 ';
        color: inherit;
    }
}
</style>
