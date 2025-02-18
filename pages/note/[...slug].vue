<template>
    <article class="prose dark:prose-invert max-w-none relative">
        <p v-if="showSubtitle">{{ $t('note-page.subtitle') }}</p>
        <ContentDoc>
            <template #not-found>
                <p>{{ $t('note-page.errors.not-found') }}</p>
            </template>
            <template v-slot="{ doc }">
                <div class="grid grid-cols-12 gap-6">
                    <div
                        :class="{
                            'col-span-full': true,
                            'md:col-span-9': doc.body.toc && doc.body.toc.links.length > 0,
                        }"
                    >
                        <ContentRenderer :value="doc" />
                    </div>
                    <div v-if="doc.body.toc" class="hidden md:col-span-3 md:block not-prose">
                        <aside class="sticky top-8">
                            <nav>
                                <TocLink :links="doc.body.toc.links" :activeId="activeId" />
                            </nav>
                        </aside>
                    </div>
                </div>
            </template>
        </ContentDoc>
        <waving-cat />
    </article>
</template>

<script setup>
const route = useRoute()
// defines
definePageMeta({
    layoutClassList: 'md:max-w-6xl',
    hideI18nMenu: true,
})
// refs
const activeId = ref(null)
// computed
const showSubtitle = computed(() => {
    return route.path == '/note'
})
// life-cycle
onMounted(() => {
    const callback = (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                activeId.value = entry.target.id
                break
            }
        }
    }
    const observer = new IntersectionObserver(callback, {
        root: null,
        threshold: 0.5,
    })
    let elements
    setTimeout(() => {
        elements = document.querySelectorAll('h2, h3')
        if (elements) {
            for (const element of elements) {
                observer.observe(element)
            }
        }
    }, 150)
    onBeforeUnmount(() => {
        if (elements) {
            for (const element of elements) {
                observer.unobserve(element)
            }
        }
    })
})
</script>
