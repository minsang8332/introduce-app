<template>
    <NuxtLayout>
        <section class="text-4xl mb-4">
            <h1>다음과 같은 오류가 발생했습니다. ({{ error.statusCode }})</h1>
            <h2>{{ error.statusMessage }}</h2>
        </section>
    </NuxtLayout>
</template>
<script setup>
defineProps({
    error: Object,
})
</script>
