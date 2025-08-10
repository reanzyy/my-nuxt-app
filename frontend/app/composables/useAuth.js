export default function useAuth() {
  const user = useState('auth-user', () => null)

  const { errorBag, transformValidationErrors, resetErrorBag } = useCustomError()

  const { api, csrf } = useAxios()

  async function me() {
    try {
      const { request } = await api.get("/me")
      user.value = request
    } catch (e) {
      user.value = null
      console.error("error", e)
    }
  }

  function login(userForm) {
    resetErrorBag()
    csrf().then(() => {
      api.post("/auth/login", userForm)
        .then(({ request }) => {
          user.value = request.user
          const token = request.data.token
          $fetch('/api/set-cookie', {
            method: "POST",
            body: { token }
          }).then(() => {
            navigateTo("/")
          })
        })
        .catch(err => {
          transformValidationErrors(err.response)
        })
    })
  }

  function logout() {
    api.post("/auth/logout").then(() => {
      user.value = null
      $fetch('/api/logout', {
        method: "POST",
      }).then(res => {
        navigateTo("/")
      })

    })
  }

  function register(userForm) {

    resetErrorBag()
    csrf().then(() => {
      api.post("auth/register", userForm).then(() => {
        //   verify email screen
      }).catch(err => {
        transformValidationErrors(err.response)
      })
    })
  }


  return { login, logout, register, errorBag, user, me }

}