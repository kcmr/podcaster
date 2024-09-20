export interface Podcast {
  id: string
  title: string
  author: string
  imageSrc: string
  description: string
}

export interface PodcastDetail extends Podcast {
  episodes: PodcastEpisode[]
}

export interface PodcastEpisode {
  id: string
  title: string
  description: string
  durationMs: number
  releaseDate: string
  audioUrl: string
}
