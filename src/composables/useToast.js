import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const show = (options) => {
    const id = ++toastId
    const toast = {
      id,
      variant: 'info',
      duration: 3000,
      ...options
    }
    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }

    return id
  }

  const remove = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message, options = {}) => show({ message, variant: 'success', ...options })
  const error = (message, options = {}) => show({ message, variant: 'danger', ...options })
  const info = (message, options = {}) => show({ message, variant: 'info', ...options })
  const warning = (message, options = {}) => show({ message, variant: 'warning', ...options })

  return {
    toasts,
    show,
    remove,
    success,
    error,
    info,
    warning
  }
}
