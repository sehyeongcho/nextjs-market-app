/**
 * 상품의 이름과 사진을 표시하는 ProductHead 컴포넌트를 정의하는 파일입니다.
 */

import { User } from '@prisma/client'
import React from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

interface ProductHeadProps {
  title: string,
  imageSrc: string,
  id: string,
  currentUser?: User | null
}

const ProductHead = ({
  title,
  imageSrc,
  id,
  currentUser
}: ProductHeadProps) => {
  return (
    <>
      <Heading
        title={title}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            productId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ProductHead