export default function useTodos() {

  const { errorBag, transformValidationErrors, resetErrorBag } = useCustomError()
  const { api } = useAxios()

  const todos = ref([])
  const loading = ref(false)

  async function loadTodos() {
    loading.value = true
    try {
      const { data } = await api.get('/todos')
      todos.value = data.data
    } catch (err) {
      transformValidationErrors(err)
    } finally {
      loading.value = false
    }
  }

  async function createTodo(todo) {
    resetErrorBag()
    try {
      const { data } = await api.post('/todos', todo)
      todos.value.unshift(data)
    } catch (err) {
      transformValidationErrors(err)
    }
  }

  return {
    todos, loading, loadTodos, createTodo, errorBag
  }
}