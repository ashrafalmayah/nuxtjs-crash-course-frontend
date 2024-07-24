<template>
    <Title>Create a Post</Title>

    <form
        @submit.prevent="createPost"
        class="bg-white rounded-md p-8 space-y-8"
    >
        <h1 class="text-3xl font-bold text-center">Create a Post</h1>
        <div class="grid gap-2">
            <label for="title">Title</label>
            <input
                type="text"
                id="title"
                v-model="title"
                class="rounded-md border-gray-400 border py-2 px-4"
            />
        </div>
        <div class="grid gap-2">
            <label for="body">Body</label>
            <textarea
                id="body"
                v-model="body"
                class="rounded-md border-gray-400 border py-2 px-4"
            >
            </textarea>
        </div>
        <input
            type="submit"
            value="Create"
            class="bg-blue-500 rounded-md text-white font-bold cursor-pointer hover:bg-blue-600 px-8 py-2 inline"
        />
        <span v-if="isLoading" class="mx-4">Loading...</span>
        <ul
            v-show="errors.length > 0"
            class="list-inside list-disc text-sm text-red-500"
        >
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </form>
</template>
<script setup>
    let title = ref("");
    let body = ref("");
    let isLoading = ref(false);
    let errors = ref([]);

    async function createPost() {
        try {
            isLoading.value = true;
            await useNuxtApp().$apiFetch(`/api/post`, {
                method: "POST",
                body: {
                    title: title.value,
                    body: body.value,
                },
            });
            isLoading.value = false;

            useRouter().push('/');
        } catch (err) {
            isLoading.value = false;
            errors.value = Object.values(err.data.errors).flat();
        }
    }
</script>
