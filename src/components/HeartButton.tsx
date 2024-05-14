/**
 * Favorite 여부를 표시하기 위한 하트 모양의 버튼 컴포넌트를 정의하는 파일입니다.
 */

import useFavorite from '@/hooks/useFavorite'
import { User } from '@prisma/client'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  productId: string,
  currentUser?: User | null
}

const HeartButton = ({
  productId,
  currentUser
}: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    productId,
    currentUser
  })

  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
        }
      />
    </div>
  )
}

export default HeartButton
