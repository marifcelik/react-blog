import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="text-center mt-28 md:mt-72">
      <h1 className="text-8xl my-5">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-4xl my-5"><i>404</i></p>
      <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">Return to home</Link>
    </div>
  )
}

export default NotFound