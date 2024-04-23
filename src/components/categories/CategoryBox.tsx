import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  label: string,
  path: string,
  icon: IconType,
  selected?: boolean
}

const CategoryBox = ({
  label,
  path,
  icon: Icon,
  selected
}: CategoryBoxProps) => {
  return (
    <Link
      href={`/?category=${path}`}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">
        {label}
      </div>
    </Link>
  )
}

export default CategoryBox