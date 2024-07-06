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
                            <NuxtLink to="/about">About</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact">Contact</NuxtLink>
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
<style>
    .router-link-active {
        @apply font-semibold;
    }
</style>
