import clsx from 'clsx'
import { ComponentProps } from 'react'

export default function Spinner({
  hidden,
  className,
  ...rest
}: ComponentProps<'div'>) {
  return (
    <div
      {...rest}
      hidden={hidden}
      className={clsx(
        ':not([hidden]):inline-block',
        'h-8 w-8 rounded-full',
        'align-[-0.125em]',
        'border-4 border-solid border-primary-700 border-e-transparent',
        'animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]',
        className,
      )}
      role="status"
    ></div>
  )
}
