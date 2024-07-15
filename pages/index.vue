<template>
    <div class="divide-gray-300 divide-y-2">
        <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<script setup>
    const { data:posts } = await useAPI('/api/posts');
</script>
