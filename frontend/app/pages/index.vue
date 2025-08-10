<template>
  <div class="flex-1 flex flex-col items-center justify-center h-[calc(100vh-65px)]">
    <h1 class="text-5xl font-bold text-center uppercase leading-tight">Welcome to the <br> My Todo</h1>
    <p class="mt-5 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, mollitia!</p>
    <div class="flex gap-2 mt-5">
      <button
        class="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:opacity-90 transition-all duration-200">
        <NuxtLink to="/contact" class="text-white">Get Started</NuxtLink>
      </button>
      <button>
        <NuxtLink to="/about"
          class="ml-4 bg-gray-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:opacity-90 transition-all duration-200">
          Learn More
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
