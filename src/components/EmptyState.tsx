/**
 * 빈 페이지에 표시할 컴포넌트를 정의하는 파일입니다.
 */

'use client'

import React from 'react'
import Heading from './Heading'
import Button from './Button'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  title?: string,
  subtitle?: string,
  showReset?: boolean
}

const EmptyState = ({
  title = "일치하는 제품이 없습니다",
  subtitle = "일부 필터를 변경하거나 제거해 보십시오",
  showReset
}: EmptyStateProps) => {
  const router = useRouter()

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div
        className="
          w-48
          mt-4
        "
      >
        {showReset && (
          <Button
            outline
            label="모든 필터 제거"
            onClick={() => router.push("/")} // 버튼 클릭 시 "/" 경로로 이동시키면, searchParams가 빈 객체가 되기 때문에 모든 필터가 제거됩니다.
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
