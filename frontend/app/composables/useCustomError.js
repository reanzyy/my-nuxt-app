export default function useCustomError() {

  const errorBag = useState('error-bag', () => ({}))

  function transformValidationErrors(response, handlerType = 'axios') {
    if (handlerType === 'axios') {
      if (response.data.errors) {
        for (let key in response.data.errors) {
          errorBag.value[key] = response.data.errors[key][0]
        }
      } else if (response.data.message) {
        errorBag.value.general = response.data.message
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