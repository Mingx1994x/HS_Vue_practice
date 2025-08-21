import { inject } from "vue"

export function useToast() {

  const toast = inject('notify-toast')

  if (!toast) {
    throw new Error('Toast provider is missing!')
  }

  return toast
}