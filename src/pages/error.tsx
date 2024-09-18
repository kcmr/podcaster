import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div>
      <h1>Oops :(</h1>
      <p>
        {isRouteErrorResponse(error)
          ? error.statusText || error.data
          : 'An unexpected error has occurred.'}
      </p>
    </div>
  )
}
