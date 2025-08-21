import Swal from "sweetalert2";
import { provide } from "vue";

const toastConfig = {
  toast: true,
  position: "top-end",
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },

}

const customConfig = {
  addToCart: {
    customClass: {
      popup: 'colored-toast add-to-cart'
    }
  },
  deleteCart: {
    customClass: {
      popup: 'colored-toast delete-cart'
    }
  }
}
export function useToastProvide() {


  const toast = Swal.mixin(toastConfig);

  const showToast = (state, message, customOptions = {}) => {
    return toast.fire({
      icon: state,
      title: message,
      ...customOptions
    })
  }

  const confirmModal = (productName) => {
    return Swal.fire({
      title: "確定要刪除嗎?",
      text: `${productName}將從購物車刪除嘍？`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消"
    })
  }

  const successState = (productName, mode = "addToCart") => {
    return (mode === 'addToCart' ?
      (showToast('success', `${productName}已經購物車`, customConfig[mode]))
      : (showToast('success', `${productName}已經移除`, customConfig[mode]))
    )
  }

  const errorState = (mode = "addToCart") => {
    return (mode === 'addToCart' ?
      (showToast('error', `加入購物車失敗，請稍後再試或洽詢客服`))
      : (showToast('error', `刪除購物車失敗，請稍後再試或洽詢客服`))
    )
  }



  const toastProvide = {
    confirmModal,
    successState,
    errorState
  }

  provide('notify-toast', toastProvide)

  return toastProvide
}

