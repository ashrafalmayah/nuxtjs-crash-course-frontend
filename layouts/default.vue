<template>
    <div class="bg-gray-100 text-gray-900 min-h-screen">
        <header class="py-8 bg-white shadow">
            <div
                class="max-w-6xl mx-auto flex justify-between items-center text-lg"
            >
                <NuxtLink to="/" class="font-bold">LOGO</NuxtLink>
                <nav>
                    <ul class="flex gap-8">
                        <li>
                            <NuxtLink to="/">Home</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/login">Login</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/register">Register</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/my-info">My info</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/create">Create</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about">About</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact">Contact</NuxtLink>
                        </li>
                        <li>
                            <button @click="logout">Log out</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <main class="container w-1/2 mx-auto px-6 mt-8">
            <slot />
        </main>
    </div>
</template>

<script setup>
    useHead({
        titleTemplate: (extension) => {
            return extension ? `${extension} | Nuxt Blog` : "Nuxt Blog";
        },
    });

    const { $apiFetch } = useNuxtApp();

    async function logout() {
        try {
            await $apiFetch("/logout", {
                method: "POST",
            });
        } catch (err) {
            console.log(err.data);
        } finally {
            window.location.pathname = "/";
        }
    }
</script>

<style>
    .router-link-active {
        @apply font-semibold;
    }
</style>
