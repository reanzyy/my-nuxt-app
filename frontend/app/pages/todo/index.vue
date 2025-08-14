<script setup>
definePageMeta({ middleware: 'auth' })

const { todos, loadTodos, loading, deleteTodo, toggleTodo } = useTodos()

onMounted(() => {
  loadTodos()
})
</script>


<template>
  <Container>
    <div class="flex items-center justify-between mt-5">
      <h1 class="font-bold text-2xl">Todo Page</h1>
      <NuxtLink
        to="/todo/create"
        class="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition-all duration-200"
      >
        + Create New Todo
      </NuxtLink>
    </div>

    <div class="my-5">
      <div v-if="loading">Loading…</div>
      <ul v-else class="space-y-4">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between"
        >
          <span class="flex items-center space-x-1.5">
            <label>
              <input
                type="checkbox"
                :checked="todo.is_done"
                @change="toggleTodo(todo.id)"
              />
            </label>
            <h2 class="text-lg font-semibold">{{ todo.todo }}</h2>
          </span>
          <span class="flex items-center space-x-3">
            <NuxtLink
              :to="`/todo/${todo.id}`"
              class="text-blue-400 hover:underline">
              <UIcon name="mdi-light:pencil" class="size-5" />
            </NuxtLink>
            <button
              @click="deleteTodo(todo.id)"
              class="text-red-400 hover:underline">
              <UIcon name="pepicons-pencil:trash" class="size-5" />
            </button>
          </span>
        </li>
      </ul>
    </div>
  </Container>
</template>
