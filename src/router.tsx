import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Root from './layouts/root'
import Error from './pages/error'
import { Home, loader as homeLoader } from './pages/home'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Home />} loader={homeLoader} />
    </Route>,
  ),
)
