<template>
    <Title>Login</Title>

    <form
        @submit.prevent="login"
        class="bg-white rounded-md p-8 space-y-8 max-w-lg mx-auto"
    >
        <h1 class="text-3xl font-bold text-center">Login</h1>
        <ul
            v-show="errors.length > 0"
            class="list-inside list-disc text-sm text-red-500"
        >
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
        <div class="grid gap-2">
            <label for="email">Email</label>
            <input
                type="text"
                id="email"
                v-model="email"
                class="rounded-md border-gray-400 border py-2 px-4"
            />
        </div>
        <div class="grid gap-2">
            <label for="password">Password</label>
            <div class="relative grid">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    class="rounded-md border-gray-400 border py-2 px-4"
                />
                <button
                    type="button"
                    class="absolute top-1/2 -translate-y-1/2 right-4"
                    @click="showPassword = !showPassword"
                >
                    {{ showPassword ? "Hide" : "Show" }}
                </button>
            </div>
        </div>
        <input
            type="submit"
            value="Login"
            class="bg-blue-500 rounded-md text-white font-bold cursor-pointer hover:bg-blue-600 px-8 py-2 inline"
        />
        <span v-if="isLoading" class="mx-4">Loading...</span>
    </form>
</template>
<script setup>
    definePageMeta({
        middleware: ["guest"],
    });
    let email = ref("");
    let password = ref("");
    let isLoading = ref(false);
    let errors = ref([]);
    let showPassword = ref(false);
    const { $apiFetch } = useNuxtApp();
    const { setUser } = useAuth();

    function csrf() {
        return $apiFetch("/sanctum/csrf-cookie");
    }

    async function login() {
        try {
            await csrf();

            isLoading.value = true;

            await $apiFetch("/login", {
                method: "POST",
                body: {
                    email: email.value,
                    password: password.value,
                },
            });

            const user = await $apiFetch("/api/user");

            setUser(user.name);

            window.location.pathname = "/my-info";
        } catch (err) {
            isLoading.value = false;
            if (err.data.errors) {
                errors.value = Object.values(err.data.errors).flat();
            }
        }
        isLoading.value = false;
    }
</script>
