/**
 * 상품 업로드 페이지에 있는 카테고리의 각 항목을 정의하는 파일입니다.
 */

'use client'

import React from 'react'
import { IconType } from 'react-icons';

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
  path: string;
}

const CategoryInput = ({
  onClick,
  selected,
  label,
  icon: Icon,
  path
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-orange-500
        transition
        cursor-pointer
        ${selected ? 'border-orange-500' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput
