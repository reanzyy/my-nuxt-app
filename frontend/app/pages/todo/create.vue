<script setup>

const todo = ref('');

const handleSubmit = async () => {
  if (!todo.value) return;

  try {
    await $fetch('http://localhost:8000/api/todos', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo: todo.value })
    });
    todo.value = '';
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};
</script>

<template>
  <Container>
    <form class="mt-10" @submit.prevent="handleSubmit">
      <input id="todo" type="text" v-model="todo" required
        class="w-full px-4 py-2 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your todo" />
      <button type="submit" class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Add Todo
      </button>
    </form>
  </Container>

</template>