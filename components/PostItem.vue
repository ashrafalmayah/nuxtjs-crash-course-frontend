
<template>
    <div class="py-8 px-10">
        <h1 class="text-2xl font-bold">
            <NuxtLink :to="`/posts/${props.post?.id}`">
                {{ props.post?.title }}
            </NuxtLink>
        </h1>
        <div class="text-sm text-gray-500 flex items-center space-x-2">
            <div>
                {{ new Date(props.post?.created_at).toLocaleDateString('en', { dateStyle: 'long'})}}
            </div>
            <div>&middot;</div>
            <div>{{ props.post?.user.name }}</div>
        </div>
        <div class="mx-2 my-4 line-clamp-3">{{ props.post?.body }}</div>
        <NuxtLink
            :to="`/posts/${props.post?.id}`"
            class="bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-8 py-2 inline-block"
            >Read More</NuxtLink
        >
    </div>
</template>
<script setup>

const props = defineProps({
    post: Object,
})
</script>