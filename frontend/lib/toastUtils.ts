// utils/toastUtils.js
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toastOptions: any = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
}

export const showSuccessToast = (message: string) => {
  toast.success(message, toastOptions)
}

export const showErrorToast = (message: string) => {
  toast.error(message, toastOptions)
}

export const showInfoToast = (message: string) => {
  toast.info(message, toastOptions)
}

export const showWarningToast = (message: string) => {
  toast.warn(message, toastOptions)
}