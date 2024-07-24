<template>
    <Title>Register</Title>

    <form
        @submit.prevent="register"
        class="bg-white rounded-md p-8 space-y-8 max-w-lg mx-auto"
    >
        <h1 class="text-3xl font-bold text-center">Register</h1>
        <ul
            v-show="errors.length > 0"
            class="list-inside list-disc text-sm text-red-500"
        >
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
        <div class="grid gap-2">
            <label for="name">Name</label>
            <input
                type="text"
                id="name"
                v-model="name"
                class="rounded-md border-gray-400 border py-2 px-4"
            />
        </div>
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
        <div class="grid gap-2">
            <label for="passwordConfirm">Confirm Password</label>
            <div class="relative grid">
                <input
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    id="passwordConfirm"
                    v-model="passwordConfirm"
                    class="rounded-md border-gray-400 border py-2 px-4"
                />
                <button
                    type="button"
                    class="absolute top-1/2 -translate-y-1/2 right-4"
                    @click="showPasswordConfirm = !showPasswordConfirm"
                >
                    {{ showPasswordConfirm ? "Hide" : "Show" }}
                </button>
            </div>
        </div>
        <input
            type="submit"
            value="Register"
            class="bg-blue-500 rounded-md text-white font-bold cursor-pointer hover:bg-blue-600 px-8 py-2 inline"
        />
        <span v-if="isLoading" class="mx-4">Loading...</span>
    </form>
</template>
<script setup>
    let name = ref("");
    let email = ref("");
    let password = ref("");
    let passwordConfirm = ref("");
    let isLoading = ref(false);
    let showPassword = ref(false);
    let showPasswordConfirm = ref(false);
    let errors = ref([]);
    const { $apiFetch } = useNuxtApp();

    
    function csrf() {
        return $apiFetch("/sanctum/csrf-cookie");
    }

    async function register() {
        try {
            await csrf();

            isLoading.value = true;

            await $apiFetch("/register", {
                method: "POST",
                body: {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: passwordConfirm.value,
                },
            });

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
