import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { Home, loader as homeLoader } from './pages/home'
import {
  Podcast,
  PodcastDetail,
  podcastDetailLoader,
  PodcastEpisode,
} from './pages/podcast'
import { Root, Error } from './pages'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Home />} loader={homeLoader} />
        <Route
          path="podcast/:podcastId"
          element={<Podcast />}
          loader={podcastDetailLoader}
        >
          <Route
            index
            element={<PodcastDetail />}
            loader={podcastDetailLoader}
          />
          <Route path="episode/:episodeId" element={<PodcastEpisode />} />
        </Route>
      </Route>
    </Route>,
  ),
)
