import { createBrowserRouter } from 'react-router-dom'
import Root from './layouts/index'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home />}
    ]
  }
])

export default router
