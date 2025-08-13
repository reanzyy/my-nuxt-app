export default function useAuth() {
  const user = useState('auth-user', () => null)

  const { errorBag, transformValidationErrors, resetErrorBag } = useCustomError()

  const { api, csrf } = useAxios()

  async function me() {
    try {
      const { data } = await api.get('/me')
      user.value = data?.data ?? data ?? null
    } catch (e) {
      user.value = null
    }
  }

  function login(userForm) {
    resetErrorBag()
    csrf().then(() => {
    api.post('/auth/login', userForm)
      .then(({ data }) => {
        const token = data?.data?.token

        return $fetch('/api/set-cookie', {
          method: 'POST',
          body: { token }
        })
      })
      .then(() => navigateTo('/'))
      .catch(err => {
        transformValidationErrors(err)
      })
    })
  }

  function logout() {
    api.post('/auth/logout')
      .then(() => $fetch('/api/logout', { method: 'POST' }))
      .then(() => {
        user.value = null
        navigateTo('/signin')
      })
      .catch(() => {
        user.value = null
        navigateTo('/signin')
      })
  }

  function register(userForm) {

    resetErrorBag()
    csrf().then(() => {
      api.post('auth/register', userForm)
        .then(() => {
          navigateTo('/signin')
        })
        .catch(err => {
          transformValidationErrors(err)
        })
    })
  }


  return { login, logout, register, errorBag, user, me }

}