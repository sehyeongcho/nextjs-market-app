/**
 * 로그인된 유저만 열람할 수 있는 페이지를 정의하는 파일입니다.
 */

import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'

const User = async () => {
  const userData = await getCurrentUser()

  return (
    <div>
      로그인된 유저만 볼 수 있는 페이지입니다.
    </div>
  )
}

export default User