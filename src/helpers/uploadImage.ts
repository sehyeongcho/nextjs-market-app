/**
 * 이미지 업로드 및 업로드가 완료된 이미지의 URL을 추출하기 위한 파일입니다.
 */

const uploadImage = async (image: File) => {
  const url = "https://api.cloudinary.com/v1_1/dxg1ljnok/upload"
  const formData = new FormData
  formData.append("file", image)
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

  const response = await fetch(url, {
    method: "POST",
    body: formData
  })

  const data = await response.json()
  return data.url
}

export default uploadImage
