export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) return

  const token = useCookie('token')
  if (token.value) {
    return navigateTo('/')
  }
})