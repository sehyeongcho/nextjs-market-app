/**
 * Toastify를 이용하기 위해 layout.tsx 파일에 배치할 ToastContainer를 정의하는 파일입니다.
 */

'use client'

import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ToastProvider = () => {
  return (
    <ToastContainer
      autoClose={2000}
    />
  )
}

export default ToastProvider
