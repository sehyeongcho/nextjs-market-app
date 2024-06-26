/**
 * Container 컴포넌트를 정의하는 파일입니다.
 */

'use client'

import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-6">
      {children}
    </div>
  )
}

export default Container
