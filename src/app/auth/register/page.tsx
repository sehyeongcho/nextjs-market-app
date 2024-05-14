/**
 * 회원가입 페이지를 생성하는 파일입니다.
 * 이 파일에서는 useState()를 사용하므로 'use client'를 표시하여 클라이언트 컴포넌트로 설정합니다.
 */

'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post("/api/register", body) // register 컴포넌트는 클라이언트 컴포넌트이므로 Register 버튼을 눌렀을 때 서버 API에 요청을 보내서 입력한 payload를 데이터베이스에 저장해야 합니다.
      router.push('/auth/login')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      <form
        className="flex flex-col justify-center gap-4 min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl">Register</h1>

        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Button
          label="Register"
        />
        <div className="text-center">
          <p className="text-gray-400">
            Already a member?{" "}
            <Link href="/auth/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage
