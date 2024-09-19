import { useLoaderData } from 'react-router-dom'
import PodcastList from '../../components/podcast/podcast-list'
import type { Podcast } from '../../types'

export default function Home() {
  const podcasts = useLoaderData() as Podcast[]

  return (
    <div className="py-16">
      <PodcastList podcasts={podcasts} />
    </div>
  )
}
