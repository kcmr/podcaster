import { Link } from 'react-router-dom'
import type { Podcast } from '@/types'
import { Card } from '@/components'

interface PodcastListProps {
  podcasts: Podcast[]
}

export default function PodcastList({ podcasts }: PodcastListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-4">
      {podcasts.map(({ id, imageSrc, title, author }) => (
        <Card
          key={id}
          hoverAnimation
          className="relative flex flex-col items-center text-center"
        >
          <div className="-mt-16 mb-4">
            <img
              src={imageSrc}
              alt={`${title} cover`}
              loading="lazy"
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h2 className="text-lg font-semibold">
            <Link
              to={`podcast/${id}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {title}
            </Link>
          </h2>
          <p className="text-sm text-gray-600">{author}</p>
        </Card>
      ))}
    </div>
  )
}
