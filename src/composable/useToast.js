import { inject } from "vue"

export function useToast() {

  const toast = inject('notify-toast')

  return toast
}