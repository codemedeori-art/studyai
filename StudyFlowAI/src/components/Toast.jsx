import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            background: '#22c55e',
            color: '#fff'
          }
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#fff'
          }
        }
      }}
    />
  )
}

export default ToastProvider