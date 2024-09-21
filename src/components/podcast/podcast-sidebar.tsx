import type { ComponentProps } from 'react'
import type { Podcast } from '../../types'
import Card from '../common/card'
import { cn } from '../../utils/style'
import { Link } from 'react-router-dom'

interface PodcastSidebarProps extends ComponentProps<'div'> {
  podcast: Podcast
}

export function PodcastSidebar({ podcast, className }: PodcastSidebarProps) {
  const { title, author, imageSrc, description, id } = podcast

  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <Link
        to={`/podcast/${id}`}
        aria-label={`Go to ${title} podcast page`}
        className="flex flex-col gap-4"
      >
        <img
          src={imageSrc}
          alt={`${title} cover`}
          width={148}
          height={148}
          className="rounded-md mx-auto"
        />
        <div className="border-t pt-3.5">
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm text-gray-600">by {author}</p>
        </div>
      </Link>
      <div className="border-t pt-3.5">
        <h3 className="font-bold text-sm mb-2">Description:</h3>
        <p className="text-sm text-gray-600 italic">{description}</p>
      </div>
    </Card>
  )
}
