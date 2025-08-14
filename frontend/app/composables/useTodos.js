export default function useTodos() {

  const { errorBag, transformValidationErrors, resetErrorBag } = useCustomError()
  const { api } = useAxios()

  const todos = ref([])
  const loading = ref(false)

  async function loadTodos(params = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/todos', { params })
      todos.value = data.data
    } catch (err) {
      transformValidationErrors(err)
    } finally {
      loading.value = false
    }
  }

  async function createTodo(todo) {
    resetErrorBag()
    loading.value = true
    try {
      const { data } = await api.post('/todos', todo)
      todos.value.unshift(data)
      return data
    } catch (err) {
      transformValidationErrors(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateTodo(id, todo) {
    resetErrorBag()
    loading.value = true
    try {
      const { data } = await api.put(`/todos/${id}`, todo)
      const index = todos.value.findIndex(item => item.id === id)
      if (index !== -1) {
        todos.value[index] = data
      }
      return data
    } catch (err) {
      transformValidationErrors(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteTodo(id) {
    resetErrorBag()
    try {
      await api.delete(`/todos/${id}`)
      todos.value = todos.value.filter(item => item.id !== id)
    } catch (err) {
      transformValidationErrors(err)
      throw err
    }
  }

  async function toggleTodo(id) {
    resetErrorBag()
    try {
      await api.put(`/todos/${id}/isdone`)
      const todo = todos.value.find(item => item.id === id)
      if (todo) {
        todo.is_done = !todo.is_done
      }
    } catch (err) {
      transformValidationErrors(err)
      throw err
    }
  }

  return {
    todos, loading, loadTodos, createTodo, updateTodo, deleteTodo, toggleTodo, errorBag, resetErrorBag
  }
}