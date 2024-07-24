<template>
    <Title>My Info</Title>

    <h1 class="text-4xl font-bold">My Info</h1>
    <div>Name: {{ user?.name }}</div>
    <div>Email: {{ user?.email }}</div>
    <div class="mt-4">
        <ul v-if="posts.length" class="grid gap-2">
            <h2 class="text-3xl font-bold my-4">My Posts</h2>
            <li v-for="post in posts" :key="post.id">
                <NuxtLink
                    :to="`posts/${post.id}`"
                    class="bg-white rounded-md px-4 py-2 block text-blue-500 hover:text-blue-700"
                    >{{ post.title }}</NuxtLink
                >
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
