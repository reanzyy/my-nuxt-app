<template>
  <header class="border-b border-gray-700 h-[65px]">
    <Container class="flex items-center justify-between h-full">
      <NuxtLink to="/" class="text-lg font-bold">My Todo App</NuxtLink>
      <ul class="flex space-x-4">
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/todo">Todo</NuxtLink>
        </li>
        <li v-if="!token">
          <NuxtLink to="/signin">Sign In</NuxtLink>
        </li>
        <li v-else>
          <button @click="logout" class="text-red-400 hover:text-red-300">Logout</button>
        </li>
      </ul>
    </Container>
  </header>
</template>

<script setup>
const key = process.server ? 'token' : 'XSRF-TOKEN'
const token = useCookie(key)
const { logout } = useAuth()
</script>

