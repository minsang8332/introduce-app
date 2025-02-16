<template>
    <article class="index-page prose dark:prose-invert max-w-none">
        <section class="index-page__about-me">
            <h1 v-intersect>{{ $t('index-page.about-me.title') }}</h1>
            <p v-intersect>
                {{ $t('index-page.about-me.description') }}
            </p>
        </section>
        <section class="index-page__development">
            <h2 v-intersect>
                <a href="#development"> {{ $t('index-page.development.title') }}</a>
            </h2>
            <h4 v-intersect>{{ $t('index-page.development.main.title') }}</h4>
            <ul>
                <li v-intersect>
                    <p>{{ $t('index-page.development.main.items.1') }}</p>
                </li>
                <li v-intersect>
                    <p>{{ $t('index-page.development.main.items.2') }}</p>
                </li>
            </ul>
            <h4>{{ $t('index-page.development.sub.title') }}</h4>
            <ul v-intersect>
                <li>
                    <p>{{ $t('index-page.development.sub.items.1') }}</p>
                </li>
                <li>
                    <p>{{ $t('index-page.development.sub.items.2') }}</p>
                </li>
                <li>
                    <p>{{ $t('index-page.development.sub.items.3') }}</p>
                </li>
            </ul>
            <h4 v-intersect>{{ $t('index-page.development.others.title') }}</h4>
            <ul>
                <li v-intersect>
                    <p>{{ $t('index-page.development.others.items.1') }}</p>
                </li>
                <li v-intersect>
                    <p>{{ $t('index-page.development.others.items.2') }}</p>
                </li>
                <li v-intersect>
                    <p>{{ $t('index-page.development.others.items.3') }}</p>
                </li>
                <li v-intersect>
                    <p>{{ $t('index-page.development.others.items.4') }}</p>
                </li>
                <li v-intersect>
                    <p>{{ $t('index-page.development.others.items.5') }}</p>
                </li>
            </ul>
        </section>
        <section class="index-page__experience">
            <h2 v-intersect>
                <a href="#experience">{{ $t('index-page.experience.title') }}</a>
            </h2>
            <p v-intersect>{{ $t('index-page.experience.description') }}</p>
            <ul v-intersect>
                <li class="flex items-center gap-2">
                    <span> 2019 ~ 2020 </span>
                    <i class="fi fi-jp h-[1rem]" />
                    <a href="https://froide.co.jp/" target="_blank"> {{ $t('index-page.experience.items.freude') }}</a>
                </li>
                <li class="flex items-center gap-2">
                    <span> 2020 ~ 2022 </span>
                    <i class="fi fi-kr h-[1rem]" />
                    <a href="https://connectwave.co.kr/" target="_blank">
                        {{ $t('index-page.experience.items.connect-wave') }}
                    </a>
                </li>
                <li class="flex items-center gap-2">
                    <span> 2022 ~ 2023 </span>
                    <i class="fi fi-kr h-[1rem]" />
                    <a href="https://www.selvasai.com/" target="_blank">
                        {{ $t('index-page.experience.items.selvas-ai') }}
                    </a>
                </li>
                <li class="flex items-center gap-2">
                    <span> 2024 ~ </span>
                    <i class="fi fi-kr h-[1rem]" />
                    <a href="https://www.pentasecurity.co.kr/" target="_blank">
                        {{ $t('index-page.experience.items.penta-security') }}
                    </a>
                </li>
            </ul>
        </section>
    </article>
</template>
<script setup lang="ts">
const { t } = useI18n()
useHead({
    title: t('index-page.about-me.title'),
})
</script>
<style lang="scss" scoped>
.fi:before {
    content: '';
}
</style>
