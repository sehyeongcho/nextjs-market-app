/**
 * 상품을 즐겨찾기에 추가하거나 삭제하는 favorite 기능을 정의하는 파일입니다.
 */

import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'

interface UseFavorite {
  productId: string,
  currentUser?: User | null
}

const useFavorite = ({
  productId,
  currentUser
}: UseFavorite) => {
  const router = useRouter()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(productId)
  }, [productId, currentUser])

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (!currentUser) {
      toast.warn('로그인이 필요합니다')
      return
    }

    try {
      let request

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${productId}`)
      } else {
        request = () => axios.post(`/api/favorites/${productId}`)
      }

      await request()
      router.refresh() // 사용자가 상품을 즐겨찾기에 추가하거나 제거한 후에 즉시 해당 변경 사항을 화면에 반영하기 위해 사용합니다.
      toast.success('성공했습니다')
    } catch (error) {
      toast.error('실패했습니다')
    }
  }

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite
