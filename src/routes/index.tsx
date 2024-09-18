import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import MainLayout from '../layouts/main'
import ErrorPage from '../pages/error'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<h1>Home</h1>} />
    </Route>,
  ),
)
