<template>
    <slot :posts="posts">
        <section class="not-prose font-mono">
            <div class="column text-gray-400 text-sm">
                <div class="w-2/12">일자</div>
                <div class="w-10/12">제목</div>
            </div>
            <ul>
                <li v-for="post in posts" :key="post._path">
                    <NuxtLink :to="post._path" class="column group hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div
                            class="w-2/12"
                            :class="{
                                'text-white group-hover:text-gray-100 dark:text-gray-900 dark:group-hover:text-gray-800':
                                    !post.publishedAt,
                                'text-gray-400 dark:text-gray-500': post.publishedAt,
                            }"
                        >
                            {{ post.publishedAt }}
                        </div>
                        <div class="w-10/12">{{ post.title }}</div>
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </slot>
</template>

<script setup>
const props = defineProps({
    limit: {
        type: Number,
        default: null,
    },
})
const { data: posts } = await useAsyncData('diary-list', () => {
    const query = queryContent('/diary')
        .where({ _path: { $ne: '/diary' } })
        .only(['_path', 'title', 'publishedAt'])
        .sort({ publishedAt: -1 })
    if (props.limit) {
        query.limit(props.limit)
    }
    return query.find()
})
</script>

<style scoped>
.column {
    @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700;
}
</style>
