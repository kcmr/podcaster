import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import type { PodcastEpisode } from '@/types'
import { formatDuration } from '@/utils/date'
import { Card } from '@/components'

interface PodcastEpisodesProps {
  episodes: PodcastEpisode[]
}

export default function PodcastEpisodes({ episodes }: PodcastEpisodesProps) {
  return (
    <Card>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 border-b w-full">Title</th>
            <th className="text-left p-2 border-b whitespace-nowrap">Date</th>
            <th className="text-right p-2 border-b whitespace-nowrap">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {episodes.map(({ id, title, releaseDate, durationMs }, index) => (
            <tr
              key={id}
              className={clsx('border-b', index % 2 === 0 && 'bg-slate-50')}
            >
              <td className="p-2">
                <Link to={`episode/${id}`} className="text-primary-700">
                  {title}
                </Link>
              </td>
              <td className="p-2 align-top">
                {new Date(releaseDate).toLocaleDateString()}
              </td>
              <td className="p-2 align-top text-right">
                {!durationMs ? 'N/A' : formatDuration(durationMs)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
