/**
 * 이미지를 업로드하기 전 미리보기로 보여주기 위한 파일입니다.
 */

const previewImage = (e: any, setImagePreview: any, setImage: any) => {
  const file = e.target.files[0]
  setImage(file)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    setImagePreview(reader.result)
  }
}

export default previewImage
