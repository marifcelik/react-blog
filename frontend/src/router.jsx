import { createBrowserRouter } from 'react-router-dom'
import Root from './layouts/index'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        id: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  }
])

export default router
