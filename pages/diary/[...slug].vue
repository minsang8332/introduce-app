<template>
    <article class="max-w-none prose dark:prose-invert">
        <ContentDoc>
            <template #not-found>
                <p>지금 접근하신 경로에 대해 저는 아무 것도 모릅니다!</p>
            </template>
            <template v-slot="{ doc }">
                <div class="grid grid-cols-6 gap-16">
                    <div
                        :class="{
                            'col-span-6 md:col-span-4': doc.toc,
                            'col-span-6': !doc.toc,
                        }"
                    >
                        <ContentRenderer :value="doc" />
                    </div>
                    <div class="hidden md:col-span-2 md:block not-prose" v-if="doc.toc">
                        <aside class="sticky top-8">
                            <div class="font-semibold mb-2">Table of Contents</div>
                            <nav>
                                <TocLinks :links="doc.body.toc.links" :activeId="activeId" />
                            </nav>
                        </aside>
                    </div>
                </div>
            </template>
        </ContentDoc>
    </article>
</template>

<script setup>
const activeId = ref(null)
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
