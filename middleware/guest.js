export default defineNuxtRouteMiddleware((to, from) => {
    let { isLoggedIn } = useAuth();

    if (process.client) {
        if (isLoggedIn.value) {
            return (window.location.pathname = "/my-info");
        }
    }
});
