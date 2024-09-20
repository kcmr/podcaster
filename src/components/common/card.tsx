import { ComponentProps } from 'react'
import { cn } from '../../utils/style'

interface CardProps extends ComponentProps<'div'> {
  hoverAnimation?: boolean
}

export default function Card({
  hoverAnimation,
  children,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        'p-4',
        'bg-white',
        'rounded-lg',
        'shadow-sm shadow-slate-200',
        {
          [`hover:shadow-lg hover:shadow-slate-300 
          transition-shadow duration-300`]: hoverAnimation,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
