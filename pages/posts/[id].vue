<template>
    <Title>{{ post?.title }}</Title>

    <h1 class="text-3xl font-bold">{{ post?.title }}</h1>
    <div class="text-sm text-gray-500 flex items-center space-x-2">
        <div>
            {{ new Date(post?.created_at).toLocaleDateString('en', { dateStyle: 'long'})}}
        </div>
        <div>&middot;</div>
        <div>{{ post?.user.name }}</div>
    </div>
    <p class="mt-8 pb-8">{{ post?.body }}</p>
</template>

<script setup>
    const { data: post } = useAPI(`/api/posts/${useRoute().params.id}`);
</script>
