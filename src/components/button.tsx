import { ComponentProps, forwardRef, Ref } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  label: string
}

export default forwardRef(function Button(
  { label, onClick, ...rest }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button {...rest} onClick={onClick} ref={ref}>
      {label}
    </button>
  )
})
