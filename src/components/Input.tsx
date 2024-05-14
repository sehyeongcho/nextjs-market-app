/**
 * Input 컴포넌트를 정의하는 파일입니다.
 */

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>; // react-hook-form에서 제공하는 입력을 폼에 등록하는 함수입니다.
  errors: FieldErrors; // react-hook-form에서 제공하는 유효성 검사 오류를 담은 객체입니다.
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors
}) => {
  return (
    // label의 for 속성을 이용하여 input의 id 속성과 연결하는 대신, label과 input이 동일한 부모 요소를 가지면 자동으로 연결된 것으로 인식됩니다.
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute text-neutral-700 top-5 left-2">₩</span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })} // 사용자가 값을 입력하지 않으면 유효성 검사 오류가 발생합니다.
        placeholder=""
        type={type}
        className={`
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input