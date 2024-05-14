/**
 * 상품을 등록한 사람, 등록한 시간, 상품의 카테고리, 카테고리 설명 등의 세부 정보를 표시하는 ProductInfo 컴포넌트를 정의하는 파일입니다.
 */

import { User } from '@prisma/client'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../Avatar'
import { formatTime } from '@/helpers/dayjs'
import ProductCategory from './ProductCategory'

interface ProductInfoProps {
  user: User,
  category: {
    icon: IconType,
    label: string,
    description: string
  } | undefined,
  createdAt: Date,
  description: string
}

const ProductInfo = ({
  user,
  category,
  createdAt,
  description
}: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Avatar src={user?.image} />
          <p>{user?.name}</p>
        </div>
        <div>
          {formatTime(createdAt)}
        </div>
      </div>
      <hr />
      {category && (
        <ProductCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div>
        {description}
      </div>
    </div>
  )
}

export default ProductInfo
