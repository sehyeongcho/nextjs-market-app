
import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'

const User = async () => {
  // const session = await getServerSession(authOptions)
  // console.log('session', session)

  const userData = await getCurrentUser()
  // console.log('userData', userData)

  return (
    <div>
      로그인 된 유저만 볼 수 있는 페이지입니다.
    </div>
  )
}

export default User