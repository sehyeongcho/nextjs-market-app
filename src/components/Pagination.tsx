'use client'

import React from 'react'
import usePagination from '@lucasmogari/react-pagination'
import PaginationLink from './PaginationLink'

interface PaginationProps {
  page: number,
  totalItems: number,
  perPage: number
}

const Pagination = ({
  page,
  totalItems,
  perPage
}: PaginationProps) => {
  // use the usePagination hook
  // getPageItem - function that returns the type of page based on the index.
  // size - the number of pages
  const { fromItem, toItem, getPageItem, totalPages } = usePagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 5
  })

  const firstPage = 1
  // calculate the next page
  const nextPage = Math.min(page + 1, totalPages)
  // calculate the previous page
  const prevPage = Math.max(page - 1, firstPage)
  // create a new array based on the total pages
  const arr = new Array(totalPages + 2)

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Item {fromItem}-{toItem} */}
      {[...arr].map((_, i) => {
        // getPageItem function returns the type of page based on the index.
        // It also automatically calculates if the page is disabled.
        const { page, disabled, current } = getPageItem(i)
        console.log('page, disabled, current', page, disabled, current)
        if (page === 'previous') {
          return (
            <PaginationLink
              key={i}
              page={prevPage}
              disabled={disabled}
            >
              {"<"}
            </PaginationLink>
          )
        }

        if (page === 'next') {
          return (
            <PaginationLink
              key={i}
              page={nextPage}
              disabled={disabled}
            >
              {">"}
            </PaginationLink>
          )
        }

        if (page === 'gap') {
          return (<span key={i}>...</span>)
        }

        return (
          <PaginationLink
            key={i}
            page={page}
            active={current}
          >
            {page}
          </PaginationLink>
        )
      })}
    </div>
  )
}

export default Pagination