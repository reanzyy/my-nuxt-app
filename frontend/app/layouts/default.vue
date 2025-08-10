<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
    <Header class="flex" />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
