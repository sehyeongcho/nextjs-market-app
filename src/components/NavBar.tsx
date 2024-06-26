/**
 * 반응형 내비게이션 바를 정의하는 파일입니다.
 * 이 파일에서는 useState()를 사용하므로 'use client'를 표시하여 클라이언트 컴포넌트로 설정합니다.
 */

'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem'
import { User } from '@prisma/client'

interface NavBarProps {
  currentUser?: User | null
}

const NavBar = ({ currentUser }: NavBarProps) => {
  const [menu, setMenu] = useState(false)

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <nav className='relative z-10 w-full text-white bg-orange-500'>
      <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
        {/* logo */}
        <div className='flex items-center text-2xl h-14'>
          <Link href='/'>Used Market</Link>
        </div>

        {/* menu */}
        <div className='text-2xl sm:hidden'>
          {(menu === false)
            ? <button onClick={handleMenu}>+</button>
            : <button onClick={handleMenu}>-</button>}
        </div>

        {/* nav-items large screen */}
        <div className='hidden sm:block'>
          <NavItem currentUser={currentUser} />
        </div>
      </div>

      {/* nav-items mobile */}
      <div className='block sm:hidden'>
        {(menu === false)
          ? null
          : <NavItem mobile currentUser={currentUser} />}
      </div>
    </nav>
  )
}

export default NavBar
