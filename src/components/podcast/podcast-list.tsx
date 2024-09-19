import { Podcast } from '../../types'
import Card from '../common/card'

interface PodcastListProps {
  podcasts: Podcast[]
}

export default function PodcastList({ podcasts }: PodcastListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-4">
      {podcasts.map((podcast) => (
        <Card key={podcast.id} hoverAnimation>
          <div className="-mt-16 mb-4">
            <img
              src={podcast.imageSrc}
              alt={`${podcast.title} cover`}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h3 className="text-lg font-semibold">{podcast.title}</h3>
          <p className="text-sm text-gray-600">{podcast.author}</p>
        </Card>
      ))}
    </div>
  )
}
