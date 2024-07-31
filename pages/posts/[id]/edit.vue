<template>
    <Title>Create a Post</Title>

    <form
        @submit.prevent="updatePost"
        class="bg-white rounded-md p-8 space-y-8"
    >
        <h1 class="text-3xl font-bold text-center">Edit a Post</h1>
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
                rows="9"
            >
            </textarea>
        </div>
        <input
            type="submit"
            value="Update"
            class="bg-blue-500 rounded-md text-white font-bold cursor-pointer hover:bg-blue-600 px-8 py-2 inline"
        />
        <button
            type="button"
            @click="deletePost"
            class="bg-red-500 rounded-md text-white font-bold cursor-pointer hover:bg-red-600 px-8 py-2 ms-4 inline"
        >
            Delete
        </button>
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
    definePageMeta({
        middleware: ["auth"],
    });
    const title = ref("");
    const body = ref("");
    const isLoading = ref(false);
    const errors = ref([]);
    const post = ref(null);
    const { $apiFetch } = useNuxtApp();

    onMounted(async () => {
        try {
            post.value = await $apiFetch(
                `/api/postsAuth/${useRoute().params.id}`
            );
            title.value = post.value.title;
            body.value = post.value.body;
        } catch (err) {
            useRouter().push("/");
        }
    });

    async function updatePost() {
        try {
            isLoading.value = true;
            await $apiFetch(`/api/post/${useRoute().params.id}`, {
                method: "PATCH",
                body: {
                    title: title.value,
                    body: body.value,
                },
            });
            isLoading.value = false;

            title.value = "";
            body.value = "";

            useRouter().push("/");
        } catch (err) {
            if (err.response.status == 403) {
                alert(err.data.message);
                return;
            }
            isLoading.value = false;
            errors.value = Object.values(err.data.errors).flat();
        }
    }

    async function deletePost() {
        try {
            isLoading.value = true;
            await $apiFetch(`/api/post/${useRoute().params.id}`, {
                method: "DELETE",
            });
            isLoading.value = false;
            title.value = "";
            body.value = "";
            useRouter().push("/");
        } catch (err) {
            isLoading.value = false;
        }
    }
</script>
