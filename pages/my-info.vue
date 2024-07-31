<template>
    <Title>My Info</Title>

    <h1 class="text-4xl font-bold">My Info</h1>
    <div>Name: {{ user?.name }}</div>
    <div>Email: {{ user?.email }}</div>
    <div class="mt-4">
        <ul v-if="posts.length" class="grid gap-2">
            <h2 class="text-3xl font-bold my-4">My Posts</h2>
            <li v-for="post in posts" :key="post.id" class="bg-white rounded-md px-4 py-2 flex justify-between text-blue-500 hover:text-blue-700">
                <NuxtLink
                    :to="`/posts/${post.id}`"
                    >{{ post.title }}</NuxtLink
                >
                <NuxtLink :to="`/posts/${post.id}/edit`">Edit</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })
    const user = ref(null);
    const posts = ref([]);

    const { $apiFetch } = useNuxtApp();

    onMounted(async () => {
        user.value = await $apiFetch("/api/user");

        posts.value = await $apiFetch("/api/user/posts");
    });
</script>
