<script setup>

const {api} = useAxios();

const todos = ref([]);

onMounted(() => {
  loadTodos();
});

function loadTodos(){
  api.get('/todos').then(({data}) => {
    todos.value = data;
    console.log(data);
    
  });
}
</script>


<template>
  <Container>
    <div class="flex items-center justify-between mt-5">
      <h1 class="font-bold text-2xl">Todo Page</h1>
      <NuxtLink to="/todo/create"
        class="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition-all duration-200">
        + Create New Todo
      </NuxtLink>
    </div>

    <div class="my-5">
      <ul class="space-y-4">
        <li v-for="todo in todos" :key="todo.id" class="bg-gray-800 p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold">{{ todo.todo }}</h2>
        </li>
      </ul>
    </div>
  </Container>
</template>
