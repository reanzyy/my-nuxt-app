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
        <li>
          <NuxtLink to="/todo">Login</NuxtLink>
        </li>
      </ul>
    </Container>
  </header>
</template>
