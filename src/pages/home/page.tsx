import { useLoaderData } from 'react-router-dom'
import { PodcastList, SearchInput } from '@/components'
import type { Podcast } from '@/types'
import { useSearchStore } from '@/store'

export default function Home() {
  const podcasts = useLoaderData() as Podcast[]
  const { searchTerm, setSearchTerm } = useSearchStore()

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <search>
        <SearchInput
          value={searchTerm}
          placeholder="Filter podcasts…"
          onChange={handleSearchChange}
          className="mt-2 mb-4"
        />
      </search>
      <div className="py-16">
        <PodcastList podcasts={filteredPodcasts} />
      </div>
    </div>
  )
}
