<script setup>
definePageMeta({ middleware: 'auth' })

const { todos, loadTodos, updateTodo, errorBag, resetErrorBag, loading } = useTodos()
const route = useRoute()
const id = route.params.id

const todo = reactive({
  todo: ''
})

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    await loadTodos({ id })
    if (todos.value.length > 0) {
      todo.todo = todos.value[0].todo
    }
  } finally {
    isLoading.value = false
  }
})

async function handleSubmit() {
  resetErrorBag()
  try {
    await updateTodo(id, todo)
    navigateTo('/todo')
  } catch (err) {
    throw err
  }
}
</script>

<template>
  <Container>
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="loader"></span>
    </div>
    <form v-else class="mt-10" @submit.prevent="handleSubmit">
      <FormGroup
        name="todo"
        v-model="todo.todo"
        :errorMessage="errorBag.todo"
        :required="false"
        label="Todo"
        type="text"
        placeholder="Enter your todo"
        :disabled="loading"
      >
      </FormGroup>
      <button :disabled="loading"
        type="submit"
        class="mt-4 w-56 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-800"
      >
        {{ loading ? 'Saving...' : 'Add Todo' }}
      </button>
    </form>
  </Container>
</template>

<style>
.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
