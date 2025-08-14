<script setup>
definePageMeta({ middleware: 'auth' })

const { createTodo, errorBag, resetErrorBag, loading } = useTodos()

const todo = reactive({
  todo: ''
})

async function handleSubmit() {
  resetErrorBag()
  try {
    await createTodo(todo)
    navigateTo('/todo')
  } catch (err) {
    throw err
  }
}
</script>

<template>
  <Container>
    <form class="mt-10" @submit.prevent="handleSubmit">
      <FormGroup
        name="todo"
        v-model="todo.todo"
        :errorMessage="errorBag.todo"
        :required="false"
        label="Todo"
        type="text"
        placeholder="Enter your todo"
      />
      <button :disabled="loading"
        type="submit"
        class="mt-4 w-56 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-800"
      >
        {{ loading ? 'Saving...' : 'Add Todo' }}
      </button>
    </form>
  </Container>
</template>
