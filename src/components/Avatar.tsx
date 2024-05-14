/**
 * 사용자 이미지를 표시하는 Avatar 컴포넌트를 정의하는 파일입니다.
 */

'use client'

import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src: string | null | undefined
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="w-10 h-10 rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src || 'https://via.placeholder.com/400x400?text=no+user+image'}
    />
  )
}

export default Avatar
