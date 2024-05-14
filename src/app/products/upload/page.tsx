/**
 * 상품을 업로드하기 위한 페이지를 생성하는 파일입니다.
 * 이 파일에서는 useState()를 사용하므로 'use client'를 표시하여 클라이언트 컴포넌트로 설정합니다.
 */

'use client'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import { categories } from '@/components/categories/Categories'
import CategoryInput from '@/components/categories/CategoryInput'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 1
    }
  })
  const imageSrc = watch('imageSrc')
  const category = watch('category')
  const latitude = watch('latitude')
  const longitude = watch('longitude')
  const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/products', data)
      .then((response) => {
        router.push(`/products/${response.data.id}`)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value)
  }

  // dynamic import를 사용하면 모듈을 빌드 타임이 아닌 런타임에 불러옵니다.
  // dynamic import를 사용하면 번들 파일을 분리하고 퍼포먼스가 향상될 수 있습니다.
  const KakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
    ssr: false // 클라이언트 사이드에서 컴포넌트를 불러오므로, 서버 사이드 렌더링을 비활성화합니다.
  })

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading
            title="Product Upload"
            subtitle="Upload your product"
          />

          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />

          <hr />

          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <hr />

          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <hr />

          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <hr />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>

          <hr />

          <KakaoMap
            setCustomValue={setCustomValue}
            latitude={latitude}
            longitude={longitude}
          />

          <Button label="상품 생성하기" />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage
