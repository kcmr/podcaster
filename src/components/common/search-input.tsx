import { cn } from '@/utils/style'
import type { ChangeEvent, ComponentProps } from 'react'

interface SearchProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  onChange?: (value: string) => void
}

export default function SearchInput({
  onChange,
  className,
  ...rest
}: SearchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <input
      placeholder="Filter…"
      {...rest}
      onChange={handleChange}
      type="search"
      className={cn(
        'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
        className,
      )}
    />
  )
}
