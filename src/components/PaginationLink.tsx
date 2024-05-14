/**
 * 페이지네이션에서 페이지 이동 기능을 정의하는 컴포넌트 파일입니다.
 */

'use client'

import { PRODUCTS_PER_PAGE } from '@/constants'
import { useSearchParams } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import qs from 'query-string'
import Link from 'next/link'

// interface PaginationLinkProps {
//   page?: number | string,
//   disabled?: boolean,
//   active?: boolean,
//   children: React.ReactNode
// }

type PaginationLinkProps = {
  page?: number | string,
  disabled?: boolean,
  active?: boolean
} & PropsWithChildren

const PaginationLink = ({
  page,
  disabled,
  active,
  children
}: PaginationLinkProps) => {
  const params = useSearchParams()
  const limit = PRODUCTS_PER_PAGE
  const skip = page ? (Number(page) - 1) * limit : 0

  let currentQuery = {}

  if (params) {
    currentQuery = qs.parse(params.toString())
  }

  // we use existing data from router query, we just modify the page.
  const updatedQuery = {
    ...currentQuery,
    page,
    skip
  }

  return (
    <Link
      // only use the query for the url, it will only modify the query, won't modify the route.
      href={{ query: updatedQuery }}
      className={`p-2 text-2xl
      ${active ? "font-bold text-orange-500" : "text-gray-500"}
      ${disabled ? "pointer-events-none text-gray-200" : ""}
      `}
    >
      {children}
    </Link>
  )
}

export default PaginationLink
