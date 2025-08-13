export default function useCustomError() {

  const errorBag = useState('error-bag', () => ({}))

  function transformValidationErrors(error, handlerType = 'axios') {
    if (handlerType === 'axios') {
      const data = error?.response?.data ?? {}

      if (data.errors) {
        for (let key in data.errors) {
          errorBag.value[key] = data.errors[key][0]
        }
      } else if (data.message) {
        errorBag.value.general = data.message
      }
    }
  }

  function resetErrorBag() {
    errorBag.value = {}
  }

  return {
    errorBag,
    transformValidationErrors,
    resetErrorBag
  }
}